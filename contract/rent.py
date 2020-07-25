import smartpy as sp


class RentalContract(sp.Contract):
    def __init__(self, _owner):
        self.init(owner=_owner, propertyList=sp.map(), houseaddress='')

    @sp.entry_point
    def addProperty(self, params):
        sp.verify(self.data.owner == sp.sender,
                  message='Only Owner Can Add A House.')
        self.checkHouseAlreadyExits(params)

    @sp.entry_point
    def updatePropertyRequest(self, params):
        self.data.houseaddress = params._houseAddress
        sp.verify(self.data.owner == sp.sender,
                  message='Only Owner Can update his/her Property.')
        sp.if ~(self.data.propertyList.contains(self.data.houseaddress)):
            sp.failwith('Property Does Not Exists.')
        sp.else:
            self.data.propertyList[self.data.houseaddress].rent = sp.tez(
                params._newRent)

    @sp.entry_point
    def acceptAgreement(self, params):
        self.data.houseaddress = params._houseAddress
        sp.if ~(self.data.propertyList.contains(self.data.houseaddress)):
            sp.failwith('Property Does Not Exists.')
        sp.verify(self.data.owner != sp.sender,
                  message='Owner Cannot Be Tenant, Please try from a different address.')
        sp.verify(self.data.propertyList[self.data.houseaddress].active ==
                  False,  message="Property Already Rented Out.")
        sp.verify(self.data.propertyList[self.data.houseaddress].deposit <=
                  sp.amount, message="Please Include Deposit while Accepting Agreement.")
        self.data.propertyList[self.data.houseaddress].active = True
        self.data.propertyList[self.data.houseaddress].tenant = sp.sender

    @sp.entry_point
    def payRent(self, params):
        self.data.houseaddress = params._houseAddress
        sp.verify(
            self.data.propertyList[self.data.houseaddress].active == True, message="Property Not Active")
        sp.verify(self.data.propertyList[self.data.houseaddress].tenant ==
                  sp.sender, message="Only Tenant can pay the rent.")
        sp.verify(self.data.propertyList[self.data.houseaddress].rent ==
                  sp.amount, message="Pay proper amount of Rent.")
        sp.send(self.data.owner,
                self.data.propertyList[self.data.houseaddress].rent)
        self.data.propertyList[self.data.houseaddress].paidRents.push(
            sp.timestamp_from_utc_now())

    @sp.entry_point
    def endContract(self, params):
        self.data.houseaddress = params._houseAddress
        sp.verify(self.data.owner == sp.sender,
                  message='Only Owner Can End Contract.')
        sp.send(self.data.propertyList[self.data.houseaddress].tenant,
                self.data.propertyList[self.data.houseaddress].deposit)
        self.data.propertyList[self.data.houseaddress].tenant = self.data.owner
        self.data.propertyList[self.data.houseaddress].active = False
        self.data.propertyList[self.data.houseaddress].dispute = False
        self.data.propertyList[self.data.houseaddress].paidRents = sp.list()

    @sp.entry_point
    def markDispute(self, params):
        self.data.houseaddress = params._houseAddress
        sp.if (sp.sender != self.data.propertyList[self.data.houseaddress].tenant):
            sp.failwith("Only Tenant can mark Dispute.")
        sp.else:
            self.data.propertyList[self.data.houseaddress].dispute = True

    @sp.entry_point
    def settleDispute(self, params):
        self.data.houseaddress = params._houseAddress
        sp.if (sp.sender != self.data.propertyList[self.data.houseaddress].tenant):
            sp.failwith("Only Tenant can mark Dispute.")
        sp.else:
            self.data.propertyList[self.data.houseaddress].dispute = False

    def checkHouseAlreadyExits(self, params):
        sp.if ~(self.data.propertyList.contains(params._houseAddress)):
            self.data.propertyList[params._houseAddress] = sp.record(tenant=self.data.owner, rent=sp.tez(
                params._rent), deposit=sp.tez(params._deposit), active=sp.bool(False), paidRents=sp.list(), dispute=False)
        sp.else:
            sp.failwith('Property Already Exists.')


@sp.add_test(name="Minimal")
def test():
    scenario = sp.test_scenario()

    owner = sp.test_account("Owner")
    tenant1 = sp.test_account("Tenant1")
    tenant2 = sp.test_account("Tenant2")

    scenario.h1("Rental Contract")
    c1 = RentalContract(owner.address)
    scenario += c1

    scenario.h2("Add 1st Property")
    scenario += c1.addProperty(_houseAddress='Houseno1',
                               _rent=100, _deposit=1000).run(sender=owner)

    scenario.h2("Add 2nd Property")
    scenario += c1.addProperty(_houseAddress='Houseno2',
                               _rent=100, _deposit=1000).run(sender=owner)

    scenario.h2("Update 1st Property")
    scenario += c1.updatePropertyRequest(_houseAddress='Houseno1',
                                         _newRent=101, _deposit=1000).run(sender=owner)

    scenario.h2("Add Property that already exists")
    scenario += c1.addProperty(_houseAddress='Houseno1',
                               _rent=100, _deposit=1000).run(sender=owner, valid=False)

    scenario.h2("Add new Property with Non-Owner Account")
    scenario += c1.addProperty(_houseAddress='Houseno3', _rent=100,
                               _deposit=1000).run(sender=tenant1, valid=False)

    scenario.h2("Confirm Agreement 1st Tenant")
    scenario += c1.acceptAgreement(_houseAddress='Houseno1').run(
        sender=tenant1, amount=sp.tez(1000))

    scenario.h2("Confirm Agreement with Owner Account")
    scenario += c1.acceptAgreement(_houseAddress='Houseno2').run(
        sender=owner, amount=sp.tez(1000), valid=False)

    scenario.h2("Confirm Agreement Tenant without deposit")
    scenario += c1.acceptAgreement(_houseAddress='Houseno2').run(
        sender=tenant2, amount=sp.tez(0), valid=False)

    scenario.h2("Confirm Agreement for already Rented out Property")
    scenario += c1.acceptAgreement(_houseAddress='Houseno1').run(
        sender=tenant2, amount=sp.tez(1000), valid=False)

    scenario.h2("Confirm Agreement 2nd Tenant")
    scenario += c1.acceptAgreement(_houseAddress='Houseno2').run(
        sender=tenant2, amount=sp.tez(1000))

    scenario.h2("Pay Rent 1st Property")
    scenario += c1.payRent(_houseAddress='Houseno1').run(sender=tenant1,
                                                         amount=sp.tez(101))

    scenario.h2("Pay Rent 2nd Property")
    scenario += c1.payRent(_houseAddress='Houseno2').run(sender=tenant2,
                                                         amount=sp.tez(100))

    scenario.h2("Pay Rent without sending proper amount")
    scenario += c1.payRent(_houseAddress='Houseno1').run(sender=tenant1,
                                                         amount=sp.tez(0), valid=False)

    scenario.h2("Pay Rent with non assigned tenant")
    scenario += c1.payRent(_houseAddress='Houseno1').run(sender=tenant2,
                                                         amount=sp.tez(101), valid=False)

    scenario.h2("Mark Dispute")
    scenario += c1.markDispute(_houseAddress='Houseno1').run(sender=tenant1)

    scenario.h2("Mark Dispute with non Tenant Account")
    scenario += c1.markDispute(_houseAddress='Houseno2').run(
        sender=tenant1, valid=False)

    scenario.h2("Settle Dispute")
    scenario += c1.settleDispute(_houseAddress='Houseno1').run(sender=tenant1)

    scenario.h2("End Contract Using Non-Onwer Account")
    scenario += c1.endContract(_houseAddress='Houseno1').run(
        sender=tenant1, valid=False)

    scenario.h2("End Contracts Using Onwer Account")
    scenario += c1.endContract(_houseAddress='Houseno1').run(sender=owner)
    scenario += c1.endContract(_houseAddress='Houseno2').run(sender=owner)

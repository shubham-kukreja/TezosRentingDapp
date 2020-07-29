# Decentralized Renting App

## Abstract :

In a traditional renting contract the deposit value is held by a trusted third party. In many instances, this third party may be the landlord themselves. This Project is a Proof-of-Concept implementation for trustless renting deposit contracts built on Tezos Blockchain. The Dapp allows Onwer's to rent out their properties through smart contract. The Dapp supports following functionalities :

1. Allows Owners to rent out multiple properties through single smart contract.
2. Allows Tenants to choose from listed properties and binds an agreement between tenant and the owner with security deposit.
3. Allows Owners to update their listings.
4. Allows Tenants to pay rent through smart contract & keep track of paid installments.
5. Allows Tenant to raise / settle Dispute against owner.
6. Allows Owner to End Contract & returns deposited money to tenants.


## Storage Structure of Smart Contract :
![Storage](./screenshots/7.png)
[Link To Contract ](./contract/rent.py)

## Screenshots :

Home Screen :
![HomeScreen](./screenshots/1.png)

Transaction using Thanos Wallet :
![HomeScreen](./screenshots/6.png)

[All ScreenShots](./screenshots)

## Tech Stack :

1. SmartPy ( IDE & Deployment)
2. ConseilJS
3. Thanos Wallet
4. React
5. Material UI

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# Micro Frontends with Module Federation (App1 & App2)

App1 and App2 were bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project demonstrates how to implement micro frontends using Webpack 5’s Module Federation feature. We have two React applications, **App1** and **App2**, which are set up as independent micro frontends. **App1** acts as the host application, while **App2** provides a remote component that is loaded dynamically into **App1**.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [How Module Federation Works](#how-module-federation-works)
- [Shared Dependencies](#shared-dependencies)
- [Docker Setup](#docker-setup)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

```
/mf-module-federation
 ├── app1/                    # Host application
 ├── app2/                    # Remote application
 ├── docker-compose.yml        # Docker setup
 └── README.md                 # This file
```

### App1

The main container application that dynamically loads remote components from **App2** using Webpack Module Federation.

### App2

The remote application that exposes a React component, which is consumed by **App1**.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Installation

To set up both applications, follow these steps:

1. Clone this repository

2. Navigate into **App1** and install dependencies:
   ```bash
   cd app1
   npm install
   ```

3. Repeat the same steps for **App2**:
   ```bash
   cd ../app2
   npm install
   ```

## Running the Project

### Using Node (Without Docker)

1. **App1**:  
   Run the host application on `localhost:3000`.
   ```bash
   cd app1
   npm start
   ```

2. **App2**:  
   Run the remote application on `localhost:3010`.
   ```bash
   cd app2
   npm start
   ```

You can now visit `http://localhost:3000` in your browser, and **App1** will load the remote component from **App2** dynamically.

### Using Docker

To run the project using Docker, follow these steps:

1. Ensure Docker is installed and running on your system.
2. In the root directory of the project, run:
   ```bash
   docker compose up
   ```

This command will build and start both **App1** and **App2** in containers, accessible on ports `3000` and `3010`, respectively.

## How Module Federation Works

Webpack’s Module Federation allows different applications (or micro frontends) to share and load code from one another at runtime. In this project:

- **App1** (host) dynamically imports the component from **App2** (remote) using the remote entry.
- Both apps share dependencies like `react` and `react-dom`, which reduces duplication and ensures version compatibility.

### Module Federation Config

- **App1**:  
   In the `webpack.config.js` file of **App1**, we define the remote application:
   ```javascript
   remotes: {
     app2: "app2@http://localhost:3010/remoteEntry.js",
   }
   ```

- **App2**:  
   In **App2**, we expose a component to be consumed by **App1**:
   ```javascript
   exposes: {
     './RemoteComponent': './src/RemoteComponent',
   }
   ```

## Shared Dependencies

Both applications share common dependencies to avoid loading multiple versions of the same libraries:

```javascript
shared: {
  react: { singleton: true, eager: true },
  'react-dom': { singleton: true, eager: true },
},
```

## Docker Setup

The project includes a `docker-compose.yml` file, which automates the setup of both applications:

```yaml
version: '3'
services:
  app1:
    build: ./app1
    ports:
      - "3000:3000"
  app2:
    build: ./app2
    ports:
      - "3010:3010"
```

### Running with Docker Compose

To bring up both services, use:

```bash
docker compose up --build
```

## Contributing

Feel free to contribute by submitting a pull request. Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License.

---

### Additional Notes

- Make sure ports `3000` and `3010` are free on your machine.
- This project can be extended by adding more micro frontends or increasing the complexity of shared modules.

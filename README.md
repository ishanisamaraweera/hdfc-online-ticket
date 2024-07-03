# HDFC Online Ticket System

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Deployment](#deployment)
- [Built Using](#built_using)
- [Authors](#authors)
- [Owner](#owner)

## About <a name = "about"></a>

This is the frontend of the HDFC Online Ticket System. This app is built using React and Ant Design. The app is used to manage the tickets of the customers. The app has the following features:

## Getting Started <a name = "getting_started"></a>

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

### Installing

1. Clone the repository

```bash
git clone
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.development` and `.env.production` file in the root directory of the project and add the following environment variables:

```bash
REACT_APP_API_URL=http://localhost:8000 # URL of the ATML API
REACT_APP_IMAGEKIT_URL=https://ik.imagekit.io/ # URL of the ImageKit CDN
```

4. Start the app in development mode

```bash
npm run dev 
```

5. Start the app for production mode

```bash
npm start
```
6. Build the app for production mode

```bash
npm run build:production
```

## Usage <a name = "usage"></a>

### Login

The login page is the first page you will see when you start the app. You can login with the following credentials:

```bash
username: admin@atml.lk
password: ********
```
## Deployment <a name = "deployment"></a>

This app is deployed on [AWS EC2](https://aws.amazon.com/ec2/) and [AWS S3](https://aws.amazon.com/s3/). The app is served using [Apache2](https://httpd.apache.org/)
## Built Using <a name = "built_using"></a>

- [React](https://reactjs.org/) - Frontend Framework
- [Ant Design](https://ant.design/) - UI Library
- [Axios]() - HTTP Client
- [React Router](https://reactrouter.com/) - Routing Library
- [React Icons](https://react-icons.github.io/react-icons/) - Icons Library
- [React Moment](https://www.npmjs.com/package/react-moment) - Date Library
- [React Helmet](https://www.npmjs.com/package/react-helmet) - SEO Library
- [React Apexcharts](https://www.npmjs.com/package/react-apexcharts) - Charts Library
- [React Imagekit](https://www.npmjs.com/package/react-imagekit) - ImageKit Library
- [React Color](https://casesandberg.github.io/react-color/) - Color Picker Library
- [React Zustand](https://www.npmjs.com/package/react-zustand) - State Management Library

## Authors <a name = "authors"></a>

- [Bhanuka Krish](https://github.com/BhanukaKrish) - Full Stack Developer


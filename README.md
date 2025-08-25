# RideRate

RideRate is a web application that allows users to manage and explore motorcycles. Users can view motorcycle details, search through their inventory, and see the location of each motorcycle on a map. The app also calculates the buyback value of each motorcycle based on the purchase date and price.

## Features

- List and search motorcycles
- View detailed information for each motorcycle
- Buyback value calculation based on purchase date
- Map view showing the location of motorcycles
- Responsive design for different devices

## Technologies

- React + TypeScript
- React Router
- React Leaflet for maps
- Vite as build tool
- CSS Modules for styling

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/riderate.git
cd riderate
````

Install dependencies:

```bash
yarn install
# or
npm install
```

## Running the App

Start the development server:

```bash
yarn dev
# or
npm run dev
```

Build the app for production:

```bash
yarn build
# or
npm run build
```

Run tests:

```bash
yarn test
# or
npm run test
```

## Folder Structure

* `src/components` – Reusable components such as MotorcycleCard, Search, Modal
* `src/hooks` – Custom hooks for managing state and fetching data
* `src/pages` – Page components like MyMotorcycles and MotorcycleDetail
* `src/assets` – Images and static assets
* `src/routes` – App routes

## Deployment

The project can be deployed easily on Vercel or any other static hosting platform.
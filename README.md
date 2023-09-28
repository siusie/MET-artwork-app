## About
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Create an account to browse through the gallery of [The Metropolitan Museum of Art](https://metmuseum.github.io/)!

## Example live site

This web app is deployed at [artwork-finder.vercel.app](https://artwork-finder.vercel.app/)

### Main layout
![image](https://github.com/siusie/MET-artwork-app/assets/93149998/7504a94c-b2ec-4fcf-a09b-277ddd3f60fc)

### Account registration
To search and view MET's art collection, create an account and log in. This takes you to the page that will contain your favourited artwork.

![image](https://github.com/siusie/MET-artwork-app/assets/93149998/11b05379-5ed5-44b7-9b12-1dff859d1f59)

### Searching artwork
There are two options: regular and advanced search.

**Regular search** looks up artwork by title. Searching for "flower" returns these results:

![image](https://github.com/siusie/MET-artwork-app/assets/93149998/6b69d692-3d67-454f-af02-856290ec90f1)

Some artworks returned by the API do not contain an image, so a placeholder image is used instead.

**Advanced search** allows additional criteria to be applied:

![image](https://github.com/siusie/MET-artwork-app/assets/93149998/71075e13-5cb0-4a2e-9ebf-14b17f03a7d1)

### Artwork layout
Clicking on the "ID" button of the returned artwork displays gives a more detailed view:

![image](https://github.com/siusie/MET-artwork-app/assets/93149998/fa70436e-0c8c-4ec0-a595-580a72b2f11b)

Choose to add the artwork to your "Favourites" collection.

### Menu for data management
![image](https://github.com/siusie/MET-artwork-app/assets/93149998/38469a1c-2980-4286-ac54-584d46a8a648)


## Local Development
1. Clone this repository: ```git clone https://github.com/siusie/MET-artwork-app.git```
2. Install npm packages in root directory: ```npm install```
3. Run the development server: ```npm run dev``` or ```yarn dev```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

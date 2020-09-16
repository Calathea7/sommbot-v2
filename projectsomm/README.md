<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email
-->





<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Calathea7/sommbot-v2/">
    <img src="https://github.com/Calathea7/sommbot-v2/blob/master/projectsomm/src/smlogo.png" alt="Logo" width="200" height="200">
  </a>

  <h2 align="center">SommBot</h2>

  <p align="center">
    Discover your next dream wine with SommBot!
    <br />
    <br />
    <a href="https://youtu.be/u27db6cwLjA">View Demo</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)



<!-- ABOUT THE PROJECT -->
## About The Project

[![SommBot Screen Shot][product-screenshot]](https://github.com/Calathea7/sommbot-v2/)

SommBot is a single-page wine recommendation web app built using full-stack technologies. SommBot makes the process of finding the perfect bottle of wine as easy as answering a Buzzfeed quiz. With only a couple of user-selected filters, the app queries my custom-built API, and uses my recommendation algorithm to best match the user with wines. Added functionality includes a user profile with saved recommendations and an integrated Google Maps API with wine markers.


### Built With

* React.js
* Node.js
* Python
* PostgreSQL
* SQLAlchemy
* Flask
* Bootstrap

### API Used

* Google Maps API
* Geocoder
* Custom Wine API (built by Anastasia)


<!-- USAGE EXAMPLES -->
## Usage

#### Landing Page
From the landing page the user is directed straight to the wine recommendation form utilizing React’s useHistory hook.

![alt text](https://github.com/Calathea7/sommbot-v2/blob/master/projectsomm/src/landing-page.gif "SommBot landing page")

#### Wine Recommendation Form
After selecting the desired wine descriptors and submitting the form, the wine filter data is converted into JSON format and sent using JavaScript fetch request to my backend web framework, Flask. I then use SQLAlchemy to query my custom API to best match the wines with user-chosen descriptors.

![alt text](https://github.com/Calathea7/sommbot-v2/blob/master/projectsomm/src/wine-form.gif "SommBot wine form")

#### Save the Recommendation
When the response is sent back from my server, the user is matched with five wines that best reflect their selected flavor profile. If they are logged in (which I track using Flask sessions), the user can also save the recommendation to their profile for future reference.

![alt text](https://github.com/Calathea7/sommbot-v2/blob/master/projectsomm/src/save-rec.gif "SommBot save recommendation")

#### User Profile
In addition to displaying saved wine recommendations, the user’s profile page uses Google Maps API to asynchronously display a world map with markers indicating the location of saved wines. This is achieved by fetching wine data from the database and passing it as props to multiple React components.

![alt text](https://github.com/Calathea7/sommbot-v2/blob/master/projectsomm/src/user-profile.gif "SommBot user profile")

<!-- ROADMAP -->
## Roadmap

Future features will include:

* Ability to rate and comment on the saved wine recommendations
* Show buying options for recommended wines
* Wine recommendations based on food pairing

<!-- GETTING STARTED -->
## To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
* Python 3.5+
* pip3

### Installation

1. Clone the repo
```sh
git clone https://github.com/Calathea7/sommbot-v2/
```
2. Get a free Google API key:
[Google Maps API](https://developers.google.com/maps/documentation/javascript/get-api-key)

3. (Disregard if running in Node env)
Create and activate a virtual environment inside your SommBot directory:
```
virtualenv env
source env/bin/activate
```
4. Install requirements.txt
```sh
pip3 install -r requirements.txt
```
5. Set up the database:
```
createdb sommbot
python3 model.py
```
6. Run the app:
```
python3 main.py
```


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

The MIT License (MIT) Copyright (c) 2020 Agne Klimaite

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo.svg?style=flat-square
[contributors-url]: https://github.com/Calathea7/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Calathea7/repo.svg?style=flat-square
[forks-url]: https://github.com/Calathea7/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/Calathea7/repo.svg?style=flat-square
[stars-url]: https://github.com/Calathea7/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/Calathea7/repo.svg?style=flat-square
[issues-url]: https://github.com/Calathea7/repo/issues
[license-shield]: https://img.shields.io/github/license/Calathea7/repo.svg?style=flat-square
[license-url]: https://github.com/Calathea7/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/anastasia-correa/
[product-screenshot]: https://github.com/Calathea7/sommbot-v2/blob/master/projectsomm/src/sommbot-bckgrnd.png


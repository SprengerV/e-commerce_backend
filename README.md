<p align="center">
  <h3 align="center">E-Commerce Backend</h3>
</p>


[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
            

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a backend server with an API that enables the viewing, creation, deletion, and modification of e-commerce related data that is stored to a relational database.



### Built With

<ul>
	<li>Node JS</li>
	<li>ExpressJS</li>
	<li>Sequelize</li>
	<li>MySQL</li>
</ul>






<!-- GETTING STARTED -->
### Installation

First, clone the repository and navigate to the directory it is saved to using your preffered terminal. Use the command 'npm install' to install all necessary dependencies. Create a file named '.env' and enter all of the necessary variables as outlined in '.env.example'. Copy the queries found in 'db/schema.sql' to your MySQL shell to create the database. Use the command 'node server' while in the root folder of the app to start the server.



<!-- USAGE EXAMPLES -->
## Usage

This server works as a backend for an e-commerce website.



<!-- TESTING -->
## Testing

Follow the instructions outlined in the installation section. Before testing, you may want to run the commond 'npm run seed' to seed the database with data. Once the server is running, use an app such as Postman or Insomnia core to interact with the API. You can also verify that data is being saved to your database using a MySQL management GUI such as Table Plus.



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- CONTACT -->
## Contact

Brendan Francis - [B.Francis@SprengerV.com](email:B.Francis@SprengerV.com)

Project Link: [https://github.com/SprengerV/e-commerce_backend](https://github.com/SprengerV/e-commerce_backend)



<!-- LICENSE -->
## License


BSD 3-Clause License

Copyright (c) 2021, Brendan Francis
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
© 2021 GitHub, Inc.
                

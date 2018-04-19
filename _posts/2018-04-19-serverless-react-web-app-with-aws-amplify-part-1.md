---
layout: post
title:  "Serverless React Web App with AWS Amplify — Part One"
date:   2018-04-19 14:34:05 +07
author: jameshamann
authorUrl: https://jameshamann.com/
image: https://cdn-images-1.medium.com/max/1024/1*_0jTP7l27uwj2CPLpqnVdw.jpeg
excerpt: Describe fundamentals about Serverless React Web App with AWS Amplify - its architecture and usecase benefits. Along with that, the article will show you a basic app implement and deployment for example.
---
![post-avatar]({{ "/assets/images/1__0jTP7l27uwj2CPLpqnVdw.jpeg" || absolute_url}})

Having previously posted about [Accelerating Mobile Development with AWS Amplify][previous-post-href], I thought I’d do the same for the Web, 
using [Amazon’s new JavaScript Library for app development][lib-link].

[previous-post-href]: https://medium.com/@jameshamann/accelerating-mobile-app-development-with-aws-amplify-fb2034e60160
[lib-link]: https://github.com/aws/aws-amplify

Before diving in, it’s probably worth understanding, at least at a high level, the architecture behind serverless apps and how they&nbsp;work.
<h4>What is a Serverless Application?</h4>
![Servless Application Architecture](/assets/images/1_eIECK-X8x_9wfu9uShspHw.png "High Level Serverless Application Model")
*High Level Serverless Application Model*

This diagram represents, at a high level, the architecture of a serverless application. Our static content
(React Web App) is stored in an S3 bucket served up to the client, either from CloudFront or directly. This
communicates with API Gateway. From here this triggers a Lambda function (which handles all our back end
logic) and communicates with DynamoDB to get, save, delete or whatever depending on what request was sent
from the&nbsp;client.
<h4>What are the benefits?</h4>

Cost. You only pay for the compute time you use. This works great if you have large fluctuations in traffic/requests. 
It also takes the hassle of maintaining a server away and some what simplifies things so you can focus on building your product. 
Obviously, every app has it’s own requirements and serverless architecture may not fit in all cases, but for the most part it provides a good framework to deploy applications at low cost, 
with minimal configuration.

<h4>What we'll be building?</h4>

To keep things nice and simple, and to avoid the stale recycled todo example, we’ll build an online inventory with basic CRUD functions. 
I’m sure it goes without saying but you’d need an AWS Account, which you can get get [here][reference]. 
I’d also advise you to keep an eye on your billing statement so you don’t incur any unexpected charges.

[reference]: https://aws.amazon.com/

<h4>Getting started</h4>

Firstly, we’ll need to install the <b>awsmobile-cli</b> and configure it with our AWS Keys.
{% highlight bash %}
#bash
$ npm install -g awsmobile-cli
[...]

$ awsmobile configure
$ configure aws
? accessKeyId:  [ENTER YOUR ACCESS KEY ID] #hit enter
? secretAccessKey: [ENTER YOUR SECRET ACCESS KEY] #hit enter
? region:  eu-west-2 #select your region using arrows and hit enter
{% endhighlight %}

Next, we’ll use [create-react-app][create-react-app] to scaffold up a React App for us.

[create-react-app]: https://github.com/facebook/create-react-app
{% highlight bash %}
#bash 
$ create-react-app serverless-web-app-example
[...]
✨  Done in 17.74s.
Success! Created serverless-web-app-example at /Users/jameshamann/Documents/Development/serverless-web-app-example
Inside that directory, you can run several commands:
yarn start
    Starts the development server.
yarn build
    Bundles the app into static files for production.
yarn test
    Starts the test runner.
yarn eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!
We suggest that you begin by typing:
cd serverless-web-app-example
  yarn start
Happy hacking!
$ cd serverless-web-app-example
{% endhighlight %}

Let’s fire up our app to make sure it’s all setup correctly.

![React Starter Page](/assets/images/1_kBjOFtIFilxIiY6WQMR0sA.png "React Starter Page")
*React Starter Page*

Great, looks good! Now lets install <b>aws-amplify</b> and <b>aws-amplify-react</b> (which just contains helpers and higher order components for react) within our project.

{% highlight bash %}
#bash 
$ npm install aws-amplify --save 
[...]
$ npm install aws-amplify-react --save
[...]
{% endhighlight %}

Once this is all installed, we’ll need to setup our backend. To initialise a project, we use the awsmobile init command within the root of our project.
 You’ll be prompted a few questions, usually the default answers provided are correct so you should be able to hit enter for each of them.
 
 {% highlight bash %}
#bash 
$ awsmobile init
[...]
✨  Done in 5.30s.
yarn add aws-amplify-react returned 0
Success! your project is now initialized with awsmobilejs
awsmobilejs/.awsmobile
     is the workspace of awsmobile-cli, please do not modify its contents
awsmobilejs/#current-backend-info
     contains information of the backend awsmobile project from the last
     synchronization with the cloud
awsmobilejs/backend
     is where you develop the codebase of the backend awsmobile project
awsmobile console
     opens the web console of the backend awsmobile project
awsmobile run
     pushes the latest development of the backend awsmobile project to the cloud,
     and runs the frontend application locally
awsmobile publish
     pushes the latest development of the backend awsmobile project to the cloud,
     and publishes the frontend application to aws S3 for hosting
Happy coding with awsmobile!
 {% endhighlight %}
 
This command creates all the necessary resources in AWS for your backend, as well as creating a awsmobilejs folder within the root of your project, which contains basic information about your project.
 
Lastly, we’ll need to hook up our client (React app) to our newly created backend. In your app’s entry point (usually App.js) include the bolded code in the snippet. This just imports the Amplify Library and configures it using a file called aws_exports which is generated when you initialise your backend, in the previous step.

 {% highlight javascript %}
# App.js 
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
export default App;
 {% endhighlight %}
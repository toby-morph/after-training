# Patient Information nuxt app

Understand NUXT!, check out [Nuxt.js docs](https://nuxtjs.org).

## Notes on managing the core PI and PI client instances

### Definitions 

* PI core = development repo for PI tool [https://bitbucket.org/morphuk/patient-information/src/master/]
* PI instance = clone of PI tool set up for specific client/purpose

### Managing complexity

* PI core is already complex and ideally should not have much more functionality added to it as will get too much for a single dev (i.e. me!) to manage!
* New functionality should go into a client repo by default, and only be worked back into PI core if absolute necessary!
* Vue components shared across all morph nuxt sites are kept in a separate git repo - this needs initialising separately when setting up a PI (see below). Any changes made to these shared files will need committing back to the components git repo from components/lib - if needing to be kept and shared between all nuxt sites - to be done with care!

### Relationship between PI core and PI instances

* Any PI instance can only have 1 set of content and theming files (or >1 in case of multi-version) - this is a result of using a git-based CMS like Netlify - so multiple instances of the tool CANNOT be run off a single repo
* The core PI tool repo should only have staging and master branches. All new dev work done in a branch off staging, merged back into staging, then pushed to https://pi-core-staging.netlify.app for testing. Then after testing, merged into master and pushed to https://pi-core-master.netlify.app
* The core PI tool should share all env, content, images, themes etc between the branches - there is no way to cleanly set up different content/config for different branches that I have yet found!
* For this reason, PI core should NOT be used for the client-facing example - it’s too easy to over-write content. https://participant-info.digitrial.com/ should point to a separate PI instance and be treated as any other PI client site. It will need to be updated MANUALLY when required.
* Any client site (preview or live) - must be set up as a new PI instance and disconnected from PI core. If absolutely required, it will need updating MANUALLY from PI core. 
* Default approach should be NOT to update a PI instance from PI core as it is tricky and time-consuming
* For an overview of how to approach it see [Updating a PI instance from core](#-updating-a-pi-instance-from-core) - but it will be different for each site.

## Set up new local dev instance of the PI tool

### Cloning the patient-information repo

```bash
# clone repo from bitbucket or github
$ git clone git@bitbucket.org:morphuk/pi-core.git YOUR-SITE-FOLDER

# move to new site dir
$ cd YOUR-SITE-FOLDER

# fetch shared components from git@bitbucket.org:morphuk/morph-component-library.git
$ git submodule init
$ git submodule update

# !!! JUMP TO yarn install IF NOT CREATING A NEW SITE FROM THE PATIENT-INFO REPO !!!

# detach from parent repo
$ rm -rf .git
$ git init
$ git add --all
$ git commit -m 'initial commit'

# re-establish morph-nuxt-components as git submodule to components/lib
$ rm -r components/lib
$ git rm --cached -r components/lib
$ rm .gitmodules
$ touch .gitmodules
$ git submodule add git@bitbucket.org:morphuk/morph-component-library.git components/
lib
# configure to follow master branch
$ git config -f .gitmodules submodule.components/lib.branch master

$ git add --all
$ git commit -m 'connecting up component submodule'

# set up new empty repo in BitBucket - YOUR-SITE-REPO - (no README or gitignore)
$ git remote add origin git@bitbucket.org:morphuk/YOUR-SITE-REPO.git
# test this has worked
$ git remote -v
$ git push origin master

# set node version if necessary - e.g. nvm use node
$ yarn install
```

### Setting up the ENV variables

In root, save .env.example as .env and define all variables as required

Notes:

If GA_ENABLED is set to false, GA_KEY can be set to null

VERSIONS defines the content file(s) and CSS theme file(s) used by this PI instance

VERSIONS is an array of one or more JSON objects. The 'name' property gives a name to the version and is used to load CSS theme files; the 'file' property is the path to the content JSON file output by the Netlify CMS - see 'Setting up the Netlify CMS' below for how to define the name of this file

If the PI instance is multi-version (i.e. more than one set of steps content with a landing page to choose which path to follow) then VERSIONS is an array of objects:

VERSIONS = '[{  "label": "Basis Parents", "name": "basis-parents", "file": "steps-basis-parents.json" },{ "label": "Basis Children", "name": "basis-children", "file": "steps-basis-children.json" }]'

To begin with set VERSIONS to just load the steps-master.json included with the repo - VERSIONS = '[{ "label": "Master version", "name": "master", "file": "steps-master.json" }]'

USE_NUXT_IMAGE_MODULE should be set to false for now - until we can find a solution to make it work!

### Nuxt commands for working with the PI tool

```bash
# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Configure PI for the new client site

### 1. Remove content/images/styles etc relating to PI core

* In /content/steps/ copy steps-example.json and rename as steps-YOUR-SITE-NAME.json (if multi-version - create 2 new steps JSON files from steps-example.json)
* Delete the other steps json files from content/steps
* In /static/css/ copy theme-example.css and rename as theme-YOUR-SITE-NAME.css (if multi-version - create 2 new stylesheets from theme-example.css)
* Delete the other stylesheets in /static/css/
* Update .env to reference the new JSON and CSS stylesheets, e.g. VERSIONS = '[{ "label": "Readable version label", "name": "YOUR-SITE-NAME", "file": "steps-YOUR-SITE-NAME.json" }]'
* delete all images from /assets/img/ EXCEPT for 404.svg, logo.svg, thankyou.svg and welcome.svg
* test the new configuration by running yarn dev - it should load up a PI site with a single step

### 2. Deploy PI instance to Netlify

For an overview see [https://www.netlify.com/blog/2016/10/27/a-step-by-step-guide-deploying-a-static-site-or-single-page-app/]

* In your netlify team > New site from Git
* In 'Create a New Site' select BitBucket
* Select the repo to use
* In 'Basic Build Settings':
    * Build command: yarn generate (or 'yarn generate-offline' if site is supporting offline usage)
    * Publish directory: dist
* Select 'Show Advanced' - then use 'New variable' to add all the variables specified in your local .env file - see 'Setting up the ENV variables'
* Add an additional env variable NODE_VERSION = '14'
* ALTERNATIVELY: use a netlify.toml to set up configuration - see ADEPP as an example
* Select 'Deploy site'

... the deploy will fail - we need to give permission for netlify to access the component library repo
* go to Netlify > Site > Site Settings > Deploy Key : copy public key
* Go to BitBucket - morph-component-library repo > Repository settings > Access Keys > create a new access key for each netlify deployment including the components sub-module

* In Netlify - go to site settings - rename the site 'YOUR-SITE-NAME.netlify.app'
* Go to 'Deploys' > 'Trigger Deploy'
* Go to the site to check deploy has worked

### 3. Configure Netlify CMS for PI instance

Follow instructions at [https://www.netlifycms.org/docs/bitbucket-backend/]

In brief, it's a 2 step process:

#### Set up oAuth consumer in BitBucket

* user settings > workplace > Morph UK > settings > OAuth consumers
* set up a new oAuth consumer for the site, making sure the Callback URL is set to [YOUR SITE URL]/admin
* permissions: Account: Read ; Pull requests: Write
* Save, then copy the 'Key' from the new oAuth user profile

#### Edit the Netlify CMS config file for this site

* in static/admin/config.yml:
* set repo to e.g. 'morphuk/YOUR-SITE-REPO'
* copy the oAuth user's Key to 'app_id'
* set site_url to new netlify site url
* push to origin
* try logging in and updating content at YOUR-SITE-NAME.netlify.app/admin (Site name and File name for the Step file are good places to start)

It may be necessary to clear your browser LocalStorage and Cookie netlify-cms keys for this site - e.g. in Chrome Dev Tools - Application > Storage > LocalStorage

## Setting up a multi-version PI tool

Optionally, you can enable more than 1 set of steps content (text, images) and styles (colours). Users then select which version to enter from a landing page - '/version-landing'

To configure multiple versions:

### Step 1

Add multiple version objects to STEPS_VERSIONS in .env, e.g.

```.env
# a multi-version site would be an array with multiple objects ,e.g.:
STEPS_VERSIONS = '[{ "label":"Children's version", "name":"children", "file":"steps-children.json"},{ "name":"parents", "label":"Parent's version", "file":"steps-parents.json"}]'
```

### Step 2

In netlify CMS for this PI instance, create two or more files in the Steps folder - the name entered in the 'File Name' field should be the same as the value entered in the 'file' property for each version in STEPS_VERSIONS

### Step 3

Add CSS custom property themes to /static/css with the name 'theme-{{ version name}}.css' e.g. theme-children.css, theme-parents.css

## Theming the PI tool

### Fonts
  
To enable fonts to be available offline, the files are downloaded and put in assets/fonts. These local font files are referenced in @font-face declarations in assets/css

Reference the font name in tailwind.config.js:

```bash
fontFamily: {
    sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
},
```

### Colours and other styles

Color schemes and some other style features can be edited as CSS custom properties in theme-specific stylesheets.

For single version PITs set these variables in ~/assets/css/theme.scss

To enable multi-version PI instances to load different colour schemes, these custom properties can be over-ridded by stylesheets in ~/static/css/:

* theme-[VERSION_NAME].css - colours relating to a specific version - see 'Setting up the ENV variables' for what VERSION_NAME should be

For more info on theming a PIT instance see https://docs.google.com/document/d/1Z3rpZ0pG_kDYVtbz6WMDpW2tleiiA44pWkwGc0MxLVw/edit?usp=sharing

## Notes on updating a PI instance from core

There are 2 possible approaches, depending on whether the PI instance is being run as a branch of core, or is running from a separate repo.

### Shared component library updates

Code changes to shared components can be made in client sites and pushed to the morph-component-library repo, or pulled down from that repo. NOTE: any dependency code not in the components/lib folder will need copying across by hand!

See submodule documentation: https://git-scm.com/book/en/v2/Git-Tools-Submodules

To pull changes from remote:

```$ cd components/lib
git fetch
git merge origin/master
```

Or

```$ cd components/lib
git pull origin master
```

Sometimes the parent repo gets out of step with the submodule repo, and it's necessary to update the submodule link to point to the most recent changed in morph-component-library. To do this, run this command from site root
See https://stackoverflow.com/questions/18770545/why-is-my-git-submodule-head-detached-from-master

```
git submodule update --remote --merge
```


To push changes to remote:

* first push changes to submodule repo

```cd components/lib
git add --all
git commit -m ‘updating msg’
git pull origin master
git push origin master
```

* then push changes to site repo

```cd ../../
git add --all
git commit -m ‘Updating components sub-module’
git pull origin master
git push origin master
```

### Small fixes cherry-picked from core

Suitable for small, incremental bug fixes when the PI instance is still a branch of core.

* have the instance running as a separate site locally, with its own .env, assets, css files etc
* DO NOT git merge from master -> instance_branch - this will overwrite all site-specific content
* instead use 'git checkout' to merge single file(s) from master - see [https://jasonrudolph.com/blog/2009/02/25/git-tip-how-to-merge-specific-files-from-another-branch/]

### Complete update from core

Sometimes it may be necessary to update a client PI tool with fixes or new features in the main PI repo. This should be done with great caution and only when absolutely required! If a single, small update is required, try to copy the code from a specific commit listed in BitBucket into the client repo - and TEST!

If a more general update is required, then  it's best to replace the entire client repo with the PI tool master repo, while preserving any content and theming already applied to the client PIT. Go carefully!

These instructions assume a client site has been set up locally, pushed to a bitbucket repo which is deploying to netlify

### Steps

#### 1. Get up-to-date!

Make sure to pull from remote origin to get update with changes made by other users! Let them know you're updating the site and to stop working on it - and to push any changes they want to keep - the remote repo is about to be over-written!

#### 2. Take copies of local files

From the client site take a local copy of all site-specific styles:

* static/admin (netlify CMS config settings)
* content/ (JSON file with site-specific content)
* assets/ (css, icon and images, if they have been updated already for the client site)
* tailwind.config.js - may contain theme settings for the client site
* nuxt.config.js - may contain theme settings - e.g. fonts and loading bar colours
* .env - site-specific environment variables - e.g. Google Analytics API, cookie notice settings
* Any other edited files which you want to keep - e.g. added pages, component changes (this could get complicated and is why updating should only be done very carefully and when absolutely necessary)

#### 3. Re-create site from PI core

##### Approach 1

Delete the local site folder, and go through setting up the site again following 'Set up new local dev instance of the PI tool' above.

##### Approach 2

Connect to PI core in git and do a pull! (WARNING: this needs testing)

```bash
git remote add pi-core git@bitbucket.org:morphuk/patient-information.git
git pull pi-core master --no-commit --no-ff --allow-unrelated-histories
```

Then work through the conflicts and commit.

Then disconnect from pi-core, to prevent accidentally pushing to the PI core repo from an instance

```bash
git remote rm pi-core
```

#### 4. Copy and paste back saved local files

Then, copy and paste the files and folders you saved locally back into your local site, over-writing those which have been pulled from PI core repo.

Be careful with nuxt.config.js and tailwind.config.js - compare your local file to the one from PI core and make manual changes - it may contain new config settings from PI core which need keeping.

#### 5. Push to BitBucket PI instance repo (needs testing!)

Connect the new site back to the existing site repo (e.g. basis-children or similar). 

!DANGEROUS - could over-write work pushed by another dev/editor!
git push origin master --force

# Mesaba Finance Websites Documentation

## Accounts

GitHub: <accounts@mesabafinance.com>

Netlify: Login with GitHub

** Important:** To validate URLs and other HTML before deploy, install htmlproofer by making sure gem html-proofer is added to Gemfile, and installed via bundle install. Then run `htmlproofer --log-level :debug --http-status-ignore "999" ./_site`.

This documentation describes the architecture and frameworks used to create the following websites:

-   markerjavec.com

-   mesabafinance.com

-   marvellafarms.com

-   agrofundone.com

-   flashboilagency.com

-   taqtyle.com

While some pages have features that others do not (single vs multi page, forms, etc.), the tech foundation remains the same.

## Tech stack

All sites use the static site builder Jekyll to leverage speed of static vs dynamic sites and minimize both costs for hosting and administrational upkeep usually associated with installs such as WordPress. Further, all website files are hosted in Git repositories on GitHub. To edit a website, clone the repository and work on the files locally using your favorite editor. Once ready, the files can be deployed to the current hoster at Ionos via FTP or SSH.

### Version control: GitHub

All website repositories are version controlled using git. Git is an open source tool available for all platforms. If this is your first time using git, check out the documentation and resources at https://git-scm.com/. Also consider searching for some additional intro resources on Google or YouTube in order to familiarize yourself with git.

The repositories are hosted on GitHub as free, private repositories. They are available via the account accounts@mesabafinance.com. Get the password from Mark via the Accounts file on the Business Operations Drive.

Make sure to keep your work on the develop branch. Only finished work, ready to be deployed, should ever go on to the master branch.

### Static site builder: Jekyll

The core of the site is[ Jekyll](https://jekyllrb.com). Jekyll takes content stored in Markdown and YAML files, inserts it into layout templates powered by[ Liquid](https://shopify.github.io/liquid/), and generates a full output of static HTML files that are then ready to be deployed to the webspace.

For further information, check the excelletn Jekyll website, specifically the[ Docs](https://jekyllrb.com/docs/), or Google other resources. Jekyll is well documented and used by a large community, providing a lot of blog posts, support on SO, etc.

#### The core components listed by folder:

##### \_data

This is where all YAML files live. YAML files contain structured data, such as text blocks you want to render on the sites. The data can be stored in arrays which can be processed (iterated over) by Liquid within the templates. Here is a short intro to yaml: https://blog.stackpath.com/yaml/

##### \_layouts

Layouts are standardized HTML skeletons that are used by individual sites. Should you have very different sites, such as a separate blog, job postings, etc. you may create several layouts. For standard use cases, you will only have one layout file, which provides the regular HTML structure for you. Inside layout files, use includes (see below) to further break down the HTML into smaller packages and make it easier to manage.

##### \_includes

These are partial files you want to pull into other files, for example, into layouts. All the websites have separate include files for head section, footer section, and navbar (if applicable). Pull an include into another site with the Liquid tag {% include file.html %}

##### \_site

Jekyll puts all output HTML files into the \_site folder. This is the folder containing the final site which you want to deploy on the webspace.

##### assets

Regular asset storing folder. Usually comes with self-explanatory img, css, and js subfolders.

##### \_config.yml

The central configuration file holding variables that are accessible in files via the site object. For example, {{site.test}} will render the value stored under the test key inside the \_config.yml file.

#### How to render a site in Jekyll

Let's assume we have a simple single page site. We create a file called index.html in the project root folder. Inside that file, we specify the layout we want to use by setting it via the file's front matter. The front matter are a set of config variables that go at the top of the file inside two lines of dashes, for example:

---

layout: base

---

Within the front matter of a file, there are other variables we can set, for example page titles, permalinks, etc. For full reference,[ check the docs](https://jekyllrb.com/docs/front-matter/).

Front matter variables are also accessible within layout templates under the page object. For example, within the head include, we specify the page title simply via the liquid tag {{page.title}}. Thus, whenever the title variable is set within a file that makes use of the respective template, it will be automatically populated in the head section when the site is built by Jekyll.

### Design framework: Bootstrap 4/5

The sites' designs are built on Bootstrap 4, some more recent sites on Bootstrap 5. The required files are usually served locally. Some vendor libraries such as jQuery may be served via a CDN to make upgrading easier for sensitive libraries. Get all information regarding[ Bootstrap at their official website](https://getbootstrap.com/)

### Form handling: Netlify

Most form handling should have been moved to Netlify by now. Netlify includes 100 free forms per month, which should suffice in most scenarios. Forms just need to have an additional Netlify data attribute and all processing will be handled during deploy/build on Netlify.

## Deploy

The websites are static HTML files, meaning no special server setup is needed. All that's required is a webspace. This means the sites could even be hosted on something like Amazon S3, etc.

Currently, all sites are in the process of being moved to Netlify for optimal performance and ease of deployment through automatic, GitHub-based deploy workflows. Access Netlify via "Login with GitHub" and use the accounts@mesabafinance.com GitHub account. Netlify includes a generous free tier, including 100GB of bandwidth per month and more than enough build minutes. For the time being, these limits should be more than sufficient for the static pages. Upgrades to paid plans are possible if traffic increases dramatically.

All sites are connected to their respective GitHub repositories, so a simple push of the master branch triggers an automatic build and deploy. To optimize performance, Netlify is used as the name server provider. The domains remain with Ionos. This means, all domains within Ionos point to Netlify's name server, and all DNS entries are handled by Netlify. MX records for Google Workspace are added manually within the Netlify DNS Control Panel.

### Rsync

**Important: Legacy method for hosting the site on Ionos's webspace, not currently used**

E.g. for MesabaFinance.com

rsync -avP --delete-after --exclude '_robots.txt_' --force -e ssh /Users/simon/projects/erjavec/websites/mesabafinance.com/\_site/ u94291373@home746678975.1and1-data.host:/kunden/homepages/33/d746678975/htdocs/mesabafinance.com

### Git Hooks

Note: Given the move to Netlify, the following information is somewhat obsolete as builds and deploys are triggered automatically through pushing to the master branch to GitHub.

An alternative and much more convenient way to deploy is via git hooks. Git hooks are shell scripts that are executed at certain points during the git workflow. For example, you can instruct git to execute an upload script every time a branch is merged into the master branch. This means, the master branch is only used to deploy final versions by merging the develop branch into the master branch.

To enable the post-merge git hook, create a file called post-merge in <project root>/.git/hooks/, make it executable (chmod +x post-merge on Unix systems), and enter the following script in the file:

```bash
#!/bin/bash

# Determin current branch

branch="$(git rev-parse --abbrev-ref HEAD)"

# Deploy master to agrofundone.com server at Ionos

if [[ $branch == "master" ]]; then

echo 'Deploying master branch to www.agrofundone.com'

cd <your project root> && jekyll build b&& rsync -avP --delete-after --exclude '*robots.txt*' --force -e ssh <your project root>/_site/ <destination server>

if [[ $? == 0 ]]; then

      echo 'Deploy successful'

else

      echo 'Something went wrong - deploy failed'

fi

fi
```

Update the script with your respective project root and make sure the correct destination folder is chosen. Generally, the destination folders are named after the exact primary domain used for the site, e.g. the destination folder for the markerjavec.com website is markerjavec.com.

This script uses an SSH tunnel to access the webspace at Ionos. This means you will need a pair of SSH keys and have your public key copied to the server first. If you have never used SSH, ask someone for help, or read into it, for example by checking[ this intro article at Digital Ocean](https://www.digitalocean.com/community/tutorials/understanding-the-ssh-encryption-and-connection-process).

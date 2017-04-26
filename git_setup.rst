**Setup Git**

1. **Install Git** on your development computer (if not already done), using the instructions at https://git-scm.com/book/en/v2/Getting-Started-Installing-Git.
2. Open a terminal on your dev computer and **Set up your identity** & preferred text editor (optional) according to instructions here - https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup 
3. Navigate to your project folder and initialize a local repo:

    $ git init 

4. Connect to a remote Github.com repo to your local repo:

    $ git remote add <alias> <remote_url>

**Commiting changes to Github **

Git has a great variety of options, but the most basic steps for committing your changes to Github are: 

1. Check local repo status:
    git status
    
2. Add all your changes to the local repo:
    git add .

3. Commit your changes to the local repo:
    git commit -m "COMMIT MESSAGE"

4. Pull changes from the remote repo:
    git pull origin master

5. Push local changes to the remote repo:
    git push origin master

(by default, remote repo is called 'origin' and local repo branch is 'master')

Other Useful Git commands:

* Show details of the remote repo:
    git remote -v

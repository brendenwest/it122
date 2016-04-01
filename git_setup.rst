**Setup Git**

1. If you haven't done so already, **press the "fork" button** in the upper-right corner of this page to make a unique copy under your own account.
2. **Install Git** on your development computer (if not already done), using the instructions at https://git-scm.com/book/en/v2/Getting-Started-Installing-Git.
3. Navigate to the terminal on your dev computer.
4. **Set up your identity** & preferred text editor (optional) according to instructions here - https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup 
5. **Clone the Github repo** to your dev computer:

  *git clone https://github.com/[YOUR GITHUB NAME]/itc298-s16*


**Commiting changes to Github **

Git has a great variety of options, but the most basic steps for committing your changes to Github are: 

1. Check local repo status:
    git status
    
2. Add all your changes to the local repo:
    git add .

3. Commit your changes to the local repo:
    git commit -m "COMMIT MESSAGE"

4. Push your local changes to the remote repo:
    git push origin master

(by default, remote repo is called 'origin' and local repo is 'master')

Other Useful Git commands:

* Show details of the remote repo:
    git remote -v

TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)
git add * &&  git commit -m "Update repo $TIMESTAMP" && git push --set-upstream origin dev
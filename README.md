# DEXL CORE

Main branch is protected, you must do Pull request to dev first. 

## Contains
- Apps
- Packages
- Starters
- Types
- SDK

## Useful Commands
- git submodule update --init --recursive
# When cloning the main repository for other developers
git clone --recursive [your-main-repo-url]

# If someone forgot to use --recursive, they can run:
git submodule update --init --recursive

# To update all submodules to their latest versions
git submodule update --remote --merge

# To remove a submodule
git submodule deinit src/packages/testsubmodule
git rm src/packages/testsubmodule
git commit -m "Remove testsubmodule"
rm -rf .git/modules/src/packages/testsubmodule



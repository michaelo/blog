cd www
npm run-script build
scp -r www/* michaelo@michaelodden.com:public_html/
cd ..
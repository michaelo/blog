cd www
npm run-script build --prerender
scp -r www/* michaelo@michaelodden.com:public_html/
cd ..

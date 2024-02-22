# umap_cms_frontend

## Initial deploy
You Need to Set at Amplify Console.

1. Deploy Amplify env by CDK.
2. GitHub App Connection. (by GitHub Apps)
3. Image Setting in Amplify Console.(Build Settings > Build Image Settings)
- Target Image: Amazon Linux 2023
4. Rewrite and Redirect Setting in Amplify Console.(Rewrite and Rerirect > Edit)
- source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>
- target: /index.html
- input: 200(Rewrite)

## Env Settings
You Need to copy `src/environments/.env*` as `src/environments/env*`.


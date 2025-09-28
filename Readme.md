Contributing guidelines:
1. Each commit for a new feature should be done with a new branch and then be merged later on.

2. Branching
    Skeleton = Feature/name of feature added
    Example = git checkout Feature/Setup

2. Commit Description
    Skeleton = 
    " Name for commit (Ex : SignUp  , etc. ) : Feature Project setup for frontend and backend complete "

    Example = git commit -m "Setup : Project setup complete for both backend and frontend"

    Note : Keep the tense present



Setting Nodemailer with your own credentials:
1. Getting NodeMailer Credentials

    Step 1. 
    Visit the url below and also make sure get details given 
    below after clicking on the gear icon :
        https://developers.google.com/oauthplayground/

    Step 2.
        OAuth 2.0 configuration
        OAuth flow:
        OAuth endpoints:
        Authorization endpoint: 
            https://accounts.google.com/o/oauth2/v2/auth
        
        Token endpoint: 
        https://oauth2.googleapis.com/token
            Note: The OAuth endpoints above need to implement the OAuth 2.0 draft 10 specification or above. Other specification are likely to be incompatible.

        Access token location:
            You will need to list the URL https://developers.google.com/oauthplayground as a valid redirect URI in the developer console of your API. Then enter your client ID and secret below:

        OAuth Client ID: 
            Get from https://console.cloud.google.com/auth/clients
    
        OAuth Client secret: 
            Get from https://console.cloud.google.com/auth/clients
        
        Note: 
            Your credentials will be sent to our server as we need to proxy the request. Your credentials will not be logged.

    Step 4. 
        To get client id and secret, visit the url below
            https://console.cloud.google.com/auth/clients
            Generate new secret and add valid redirect uri as to get you credentials
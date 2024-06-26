#!/bin/sh

File="android/app/google-services.json"
if [ -f "$File" ]; then
    rm $File
fi

ProjectNumber=""
ProjectId=""
StorageBucket=""
MobilesdkAppId=""
ApiKey=""

i=1
while read line || [ -n "$line" ] ; do
  if  [[ ! -z $line ]]; then
    KEY="${line%%=*}"
    VALUE="${line#*=}"
    
    case $KEY in
        "FIREBASE_GCM_SENDER_ID")
            ProjectNumber=$VALUE
            ;;
        "FIREBASE_PROJECT_ID")
            ProjectId=$VALUE
            ;;
        "FIREBASE_STORAGE_BUCKET")
            StorageBucket=$VALUE
            ;;
        "FIREBASE_AOS_APP_ID")
            MobilesdkAppId=$VALUE
            ;;
        "FIREBASE_API_KEY")
            ApiKey=$VALUE
            ;;
    esac

    unset KEY
    unset VALUE
  fi

  ((i+=1))
done < .env

JSON="{
  \"project_info\": {
    \"project_number\": \"$ProjectNumber\",
    \"project_id\": \"$ProjectId\",
    \"storage_bucket\": \"$StorageBucket\"
  },
  \"client\": [
    {
      \"client_info\": {
        \"mobilesdk_app_id\": \"$MobilesdkAppId\",
        \"android_client_info\": {
          \"package_name\": \"com.random_chat_frontend\"
        }
      },
      \"oauth_client\": [],
      \"api_key\": [
        {
          \"current_key\": \"$ApiKey\"
        }
      ],
      \"services\": {
        \"appinvite_service\": {
          \"other_platform_oauth_client\": []
        }
      }
    }
  ],
  \"configuration_version\": \"1\"
}"

touch android/app/google-services.json
echo $JSON | tee -a android/app/google-services.json
exit 0
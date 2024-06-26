#!/bin/sh

AndroidFile="android/app/google-services.json"
if [ -f "$AndroidFile" ]; then
    rm $AndroidFile
fi

IOSFile="ios/random_chat_frontend/GoogleService-Info.plist"
if [ -f "$IOSFile" ]; then
    rm $IOSFile
fi

ProjectNumber=""
ProjectId=""
StorageBucket=""
ApiKey=""
AosAppId=""
IosAppId=""

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
        "FIREBASE_API_KEY")
            ApiKey=$VALUE
            ;;
        "FIREBASE_AOS_APP_ID")
            AosAppId=$VALUE
            ;;
        "FIREBASE_IOS_APP_ID")
            IosAppId=$VALUE
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
        \"mobilesdk_app_id\": \"$AosAppId\",
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
echo $JSON | tee android/app/google-services.json > '/dev/null'

PLIST="<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">
<plist version=\"1.0\">
<dict>
    <key>API_KEY</key>
    <string>$ApiKey</string>
    <key>GCM_SENDER_ID</key>
    <string>$ProjectNumber</string>
    <key>PLIST_VERSION</key>
    <string>1</string>
    <key>BUNDLE_ID</key>
    <string>org.reactjs.native.example.random-chat-frontend</string>
    <key>PROJECT_ID</key>
    <string>$ProjectId</string>
    <key>STORAGE_BUCKET</key>
    <string>$StorageBucket</string>
    <key>IS_ADS_ENABLED</key>
    <false></false>
    <key>IS_ANALYTICS_ENABLED</key>
    <false></false>
    <key>IS_APPINVITE_ENABLED</key>
    <true></true>
    <key>IS_GCM_ENABLED</key>
    <true></true>
    <key>IS_SIGNIN_ENABLED</key>
    <true></true>
    <key>GOOGLE_APP_ID</key>
    <string>$IosAppId</string>
</dict>
</plist>"
touch ios/random_chat_frontend/GoogleService-Info.plist
echo $PLIST | tee ios/random_chat_frontend/GoogleService-Info.plist > '/dev/null'

exit 0
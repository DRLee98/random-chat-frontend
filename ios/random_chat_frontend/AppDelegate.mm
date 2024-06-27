#import "AppDelegate.h"
#import "RNCConfig.h"

#import <React/RCTBundleURLProvider.h>
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h>
#import <RNKakaoLogins.h>
#import <Firebase.h>
#import "RNSplashScreen.h"


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"random_chat_frontend";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
  
  [RNSplashScreen show];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  // naver
  NSString *urlScheme = [RNCConfig envFor:@"NAVER_SERVICE_URL_SCHEME"];
  if ([url.scheme isEqualToString:urlScheme]) {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];
  }
  
  // kakao
  if([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl: url];
  }

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

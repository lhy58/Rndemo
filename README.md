 ### react-native-reanimated 常见问题
  - 报错： Reanimated 2 failed to create a worklet, maybe you forgot to add Reanimated's babel plugin? 
  - 解决： yarn start --reset-cache

  ### react-native-shared-element 问题
  - 报错：Plugin with id ‘maven’ not found
  - 原因：Gradle 7.x，The maven plugin has been removed. You should use the maven-publish plugin instead. 
  - https://github.com/expo/expo/issues/12774
```
 apply plugin: 'com.android.library'
 apply plugin: 'kotlin-android'
-apply plugin: 'maven'
+apply plugin: 'maven-publish'
 
 group = 'host.exp.exponent'
 version = '9.2.2'
 buildscript {
   }
 }
 
-// Upload android library to maven with javadoc and android sources
-configurations {
-  deployerJars
-}
-
 // Creating sources with comments
 task androidSourcesJar(type: Jar) {
-  classifier = 'sources'
+  archiveClassifier = 'sources'
   from android.sourceSets.main.java.srcDirs
 }
 
-// Put the androidSources and javadoc to the artifacts
-artifacts {
-  archives androidSourcesJar
-}
-
-uploadArchives {
-  repositories {
-    mavenDeployer {
-      configuration = configurations.deployerJars
-      repository(url: mavenLocal().url)
+publishing {
+  publications {
+    maven(MavenPublication) {
+      artifact androidSourcesJar
     }
   }
 }
```
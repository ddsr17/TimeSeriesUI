name := """anomalydetectionUI"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  specs2 % Test
)

libraryDependencies += "org.json4s" % "json4s-jackson_2.10" % "3.3.0.RC3"

libraryDependencies ++= Seq(
  "org.webjars" %% "webjars-play" % "2.4.0-1",
  "org.webjars" % "jquery" % "3.0.0-alpha1",
  "org.webjars" % "bootstrap" % "3.1.1-2",
  "org.webjars.npm" % "angular" % "1.4.3",
  "org.webjars" % "dygraphs" % "1.0.1-1"
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator

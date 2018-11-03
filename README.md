# Lampix Simulator

## Download

**Linux**: https://s3.amazonaws.com/simulator.lampix.com/lampix-simulator-master.AppImage  
**Windows**: https://s3.amazonaws.com/simulator.lampix.com/lampix-simulator-master.exe  
**macOS**: https://s3.amazonaws.com/simulator.lampix.com/lampix-simulator-master.dmg  

## Developer notes  

**NOTE: Most of the notes included here are meant for members and collaborators. If you have questions regarding the usage of the simulator, try the help section in the app or file an issue.** 

Branches matching `release/X.Y.Z` are production ready.  
The `master` branch is a development channel. The `package.json` in this branch should always have the `-master` suffix in order to separate `autoUpdater` channels.

The available channels are:

- `alpha` - gets updates from `alpha`, `beta` and `latest`
- `beta` - gets updates from `beta` and `latest`
- `latest` - stable channel, gets updates for `latest` only
- `master` - unstable channel, most updated

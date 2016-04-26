#!/bin/bash
MY_PATH=$(dirname "$0") 
TMP_DIR="tmp"

cd "$MY_PATH"
echo "$(pwd)"

if [ -d "$TMP_DIR" ]; then
 echo "Reseting worlds"
 rm -vrf "worlds"
 cp -Rv "$TMP_DIR/worlds" .
else
 echo "Backing up worlds"
 mkdir "$TMP_DIR"
 cp -Rv "worlds" "$TMP_DIR/"
fi

java -Xmx1024M -jar "canarymod.jar" -o true &
open -a Minecraft 

# Return of the Runelords Map Remake (Unofficial)

This module includes a map remake for Return of the Runelords under Paizo's CUP. The module is tuned for 2e, but should also work in 1e.

**Important**: When importing maps from the compendium, check X

**Note**: Not all maps are yet included, they will be shipped with further updates

## License

All maps are licensed under Paizo's [CUP](https://paizo.com/licenses/communityuse)

> This FoundryVTT module uses trademarks and/or copyrights owned by Paizo Inc., used under Paizo's Community Use Policy (paizo.com/licenses/communityuse). We are expressly prohibited from charging you to use or access this content. This FoundryVTT module is not published, endorsed, or specifically approved by Paizo. For more information about Paizo Inc. and Paizo products, visit [paizo.com](paizo.com).

All Maps were kindly provided by Vornn (Discord) and GoldSoul (Discord). If you want to donate to Vornn, [here's their ko-fi](https://ko-fi.com/vornn)

**GoldSoul's** maps include:

* Roderic's Cove - The Circle
* Magnimar - Gryphine Suite
* Magnimar - Ruins of Saint Sazzleru
* Korvosa - Kendall Plaza
* Crystilan - The Timeworn Tunnel
* Crystilan - Rune Giant Territory
* Crystilan - Xin Edasseril Streets

**Vorrn's** maps make up the remaining portion

The maps were built using [Forgotten Adventure's Assets](https://www.forgotten-adventures.net/) and fall under their [Fan Content License](https://docs.google.com/document/d/1YVEXSHlePMtlD-CPAigBF_b_dX9AoLEDJt4mv0oVyvQ/edit?tab=t.0)

## Releasing a New Version

Requires **zip**, **curl**, **jq**

First update the version in the module.json file, then run:

    ./release.sh 0.0.2 "$GITHUB_TOKEN" "$FOUNDRY_RETURN_MAP_REMAKE_TOKEN"

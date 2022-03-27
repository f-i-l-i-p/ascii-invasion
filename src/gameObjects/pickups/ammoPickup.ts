import Texture from "../../graphics/texture/texture";
import { ammoPickupData } from "../../textures/pixelData";
import createPixels from "../../textures/textureMaker";
import Player from "../player";
import Pickup from "./pickup";

export default class AmmoPickup extends Pickup {
    texture = new Texture(createPixels(ammoPickupData));

    private static readonly AMOUNT = 30;

    onPlayerCollision(player: Player) {
        player.giveAmmo(AmmoPickup.AMOUNT);
    }
}
import Texture from "../../graphics/texture/texture";
import { healthPickupData } from "../../textures/pixelData";
import createPixels from "../../textures/textureMaker";
import Player from "../player";
import Pickup from "./pickup";

export default class HealthPickup extends Pickup {
    texture = new Texture(createPixels(healthPickupData));

    onPlayerCollision(player: Player) {
        player.giveHealth(1);
    }
}
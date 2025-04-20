import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";

export const authUser = {
  email: "manas.bhatt@example.com",
  name: "Manas Bhatt",
  profile_pic: getAssetPath(`${ASSET_AVATARS}/avatar10.jpg`, `60x60`),
  handle: "manas.bhatt@example.com",
  job_title: "CFO",
};

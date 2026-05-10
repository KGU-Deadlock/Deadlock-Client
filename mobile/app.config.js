const { withStringsXml } = require("@expo/config-plugins");
const baseConfig = require("./app.json").expo;

const KAKAO_NATIVE_APP_KEY = process.env.KAKAO_NATIVE_APP_KEY ?? "";

/** Android strings.xml에 kakao_app_key 추가 */
const withKakaoAndroid = (config) => {
  return withStringsXml(config, (c) => {
    c.modResults.resources.string = [
      ...(c.modResults.resources.string ?? []),
      {
        $: { name: "kakao_app_key", translatable: "false" },
        _: KAKAO_NATIVE_APP_KEY,
      },
    ];
    return c;
  });
};

module.exports = {
  ...baseConfig,
  ios: {
    ...baseConfig.ios,
    urlSchemes: [`kakao${KAKAO_NATIVE_APP_KEY}`],
    infoPlist: {
      ...baseConfig.ios.infoPlist,
      KAKAO_APP_KEY: KAKAO_NATIVE_APP_KEY,
      LSApplicationQueriesSchemes: [
        `kakao${KAKAO_NATIVE_APP_KEY}`,
        ...(baseConfig.ios.infoPlist.LSApplicationQueriesSchemes ?? []),
      ],
    },
  },
  plugins: [...(baseConfig.plugins ?? []), withKakaoAndroid],
};

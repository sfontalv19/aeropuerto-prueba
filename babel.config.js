module.exports = function (api) {
  const isTest = api.env("test");

  if (isTest) {
    // Configuración usada por Jest para transformar TSX/JSX.
    return {
      presets: [
        "@babel/preset-env",
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript",
      ],
    };
  }

  // Para Next.js usamos su preset oficial, evitando que Babel reescriba constructos como const.
  return {
    presets: ["next/babel"],
  };
};

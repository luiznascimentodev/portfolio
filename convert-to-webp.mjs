import sharp from "sharp";

async function convertToWebP(inputPath, outputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    console.log(`Imagem original: ${metadata.width}x${metadata.height}`);

    // Aumentar resolução se necessário para garantir qualidade em telas de alta densidade
    const targetSize =
      Math.max(metadata.width, metadata.height) < 500
        ? 600
        : Math.max(metadata.width, metadata.height);

    await sharp(inputPath)
      .resize(targetSize, targetSize, {
        fit: "cover",
        position: "top",
        kernel: "lanczos3",
      })
      .webp({
        quality: 98,
        lossless: false,
        nearLossless: true,
        smartSubsample: false,
        effort: 6,
      })
      .toFile(outputPath);

    const newMetadata = await sharp(outputPath).metadata();
    console.log(
      `Imagem convertida: ${newMetadata.width}x${newMetadata.height}`
    );
    console.log(`✓ Conversão concluída: ${outputPath}`);
  } catch (error) {
    console.error("Erro na conversão:", error);
  }
}

convertToWebP("src/assets/avatar.png", "src/assets/avatar.webp");

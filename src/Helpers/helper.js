export const getFinalMediaQuery = (query) => {
    let finalQuery = "";
    switch (query) {
      // up to 400px device size
      case "xSmall":
        return (finalQuery = "screen and (max-width: 400px)");
      // up to 480px device size
      case "mini-phone":
        return (finalQuery = "screen and (max-width: 480px)");
      // up to 640px device size
      case "small":
        return (finalQuery = "screen and (max-width: 640px)");
      case "phone":
        return (finalQuery = "screen and (max-width: 767px)");
      case "tablet":
        return (finalQuery =
          "screen and (min-width: 768px) and (max-width: 1024px)");
      case "phone-and-tablet":
        return (finalQuery = "screen and (max-width: 1024px)");
      default:
        return finalQuery;
    }
};
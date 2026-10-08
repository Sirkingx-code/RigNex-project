$(function () {
  const $brandLogo = $("#headerBrandLogo");
  const $carousel = $("#myCarousel");
  const mainLogo = "image/mainlogo.png";
  const collapsedLogo = "image/collapselogo.png";

  const $document = $(document);
  $document.off(".productImageZoom");
  $document
    .on("mouseenter.productImageZoom", ".product-card img", function () {
      $(this).addClass("is-pointer-hovered is-zoomed-out");
    })
    .on("mouseleave.productImageZoom", ".product-card img", function () {
      const $image = $(this).removeClass("is-pointer-hovered");
      if (!$image.closest(".product-card").hasClass("is-focus-within")) {
        $image.removeClass("is-zoomed-out");
      }
    })
    .on("focusin.productImageZoom", ".product-card", function () {
      $(this).addClass("is-focus-within").find("img").addClass("is-zoomed-out");
    })
    .on("focusout.productImageZoom", ".product-card", function (event) {
      if (this.contains(event.relatedTarget)) return;

      const $card = $(this).removeClass("is-focus-within");
      $card.find("img").each(function () {
        if (!this.classList.contains("is-pointer-hovered")) {
          this.classList.remove("is-zoomed-out");
        }
      });
    });

  function updateHeaderLogo() {
    if (!$brandLogo.length) return;

    const isCollapsedViewport = window.matchMedia(
      "(max-width: 991.98px)",
    ).matches;
    $brandLogo.attr("src", isCollapsedViewport ? collapsedLogo : mainLogo);
  }

  function updateCarouselTextSize() {
    if (!$carousel.length) return;

    if (window.matchMedia("(max-width: 767.98px)").matches) {
      $carousel.find(".carousel-caption h1").css("font-size", "1.5rem");
      $carousel.find(".carousel-caption p").css("font-size", "0.8rem");
      $carousel.find(".carousel-caption .btn").css("font-size", "0.85rem");
    } else {
      $carousel.find(".carousel-caption h1").css("font-size", "");
      $carousel.find(".carousel-caption p").css("font-size", "");
      $carousel.find(".carousel-caption .btn").css("font-size", "");
    }
  }

  $(window).on("resize load", function () {
    updateHeaderLogo();
    updateCarouselTextSize();
  });

  $("#mainNavbar").on("show.bs.collapse hide.bs.collapse", function () {
    updateHeaderLogo();
  });

  updateHeaderLogo();
  updateCarouselTextSize();
});

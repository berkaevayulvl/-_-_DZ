(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  });

  nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 768px)").matches) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Открыть меню");
      }
    });
  });
})();

(function () {
  var form = document.getElementById("nutrition-checklist");
  if (!form) return;

  var boxes = form.querySelectorAll('input[type="checkbox"]');
  var fill = document.getElementById("checklist-meter-fill");
  var scoreEl = document.getElementById("checklist-score");
  var verdictEl = document.getElementById("checklist-verdict");
  var resetBtn = document.getElementById("checklist-reset");
  var total = boxes.length;

  function verdictFor(pct) {
    if (pct === 0) {
      return "Отметьте пункты выше — появится краткая интерпретация.";
    }
    if (pct <= 33) {
      return "Ориентировочно рацион сильно расходится с критериями сбалансированного питания — есть простор для мягких, последовательных изменений. На консультации можно разобрать приоритеты без резких ограничений.";
    }
    if (pct <= 66) {
      return "Соответствие среднее: часть привычек уже работает на вас, в других зонах полезна точечная донастройка режима и продуктов.";
    }
    return "Высокое соответствие общим критериям: база сформирована; дальше имеет смысл уточнять детали под ваши цели, анализы и самочувствие вместе со специалистом.";
  }

  function update() {
    var n = 0;
    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) n++;
    }
    var pct = total ? Math.round((n / total) * 100) : 0;
    if (fill) fill.style.width = pct + "%";
    if (scoreEl) {
      scoreEl.textContent =
        "Отмечено пунктов: " + n + " из " + total + " (" + pct + "%)";
    }
    if (verdictEl) verdictEl.textContent = verdictFor(pct);
  }

  for (var j = 0; j < boxes.length; j++) {
    boxes[j].addEventListener("change", update);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      for (var k = 0; k < boxes.length; k++) boxes[k].checked = false;
      update();
    });
  }

  update();
})();

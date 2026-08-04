/* ==========================================================================
   STARTRADER Careers — behaviour
   --------------------------------------------------------------------------
   Everything is feature-guarded, so this one file can be loaded on every page.
   Sections: navigation · scroll motion · parallax · counters · accordions ·
   video · StarScout filters · StarBlog tabs · Starcast player · article TOC
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, root) {
    return (root || document).querySelector(sel);
  };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  /* ── Navigation ─────────────────────────────────────────────────────── */
  function initNav() {
    var header = $(".site-header");
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = $(".nav-toggle", header);
    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = header.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    // Mark the link matching the current page. Article pages (/starblog/<slug>)
    // keep StarBlog lit, so the nav never looks "nowhere".
    var path = window.location.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
    if (path.length > 1) path = path.replace(/\/$/, "");

    $$(".nav-link, .nav-mobile a[data-nav], .footer-nav a").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      var target = href.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
      if (target.length > 1) target = target.replace(/\/$/, "");
      var active = target === path || (target === "/starblog" && path.indexOf("/starblog") === 0);
      a.classList.toggle("is-active", active);
      if (active) a.setAttribute("aria-current", "page");
    });
  }

  /* ── Scroll motion ──────────────────────────────────────────────────── */
  // One observer drives every on-view effect: fades, staggers, line masks,
  // panel wipes and the divider sweeps.
  function initReveal() {
    var targets = $$("[data-reveal], [data-stagger], .mask-line, .mask-wipe, .sweep");
    if (!targets.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    // per-element delays declared in the markup
    $$("[data-reveal]").forEach(function (el) {
      var d = el.getAttribute("data-reveal-delay");
      var y = el.getAttribute("data-reveal-y");
      if (d) el.style.setProperty("--reveal-delay", d + "s");
      if (y) el.style.setProperty("--reveal-y", y + "px");
    });
    $$(".mask-line, .mask-wipe, .sweep").forEach(function (el) {
      var d = el.getAttribute("data-reveal-delay");
      if (d) el.style.setProperty("--reveal-delay", d + "s");
    });
    // staggered children cascade off their index
    $$("[data-stagger]").forEach(function (el) {
      var step = parseFloat(el.getAttribute("data-stagger")) || 0.09;
      var base = parseFloat(el.getAttribute("data-stagger-delay")) || 0;
      $$(":scope > *", el).forEach(function (child, i) {
        child.style.transitionDelay = (base + i * step).toFixed(3) + "s";
      });
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ── Parallax ───────────────────────────────────────────────────────── */
  // The moving child drifts ±distance px as its wrapper crosses the viewport.
  function initParallax() {
    var items = $$("[data-parallax]");
    if (!items.length || reduceMotion) return;

    var pairs = items
      .map(function (el) {
        var target = el.firstElementChild;
        return target ? { el: el, target: target, d: parseFloat(el.getAttribute("data-parallax")) || 40 } : null;
      })
      .filter(Boolean);

    var ticking = false;
    var update = function () {
      ticking = false;
      var vh = window.innerHeight;
      pairs.forEach(function (p) {
        var r = p.el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var progress = (vh - r.top) / (vh + r.height);
        progress = Math.max(0, Math.min(1, progress));
        p.target.style.setProperty("--p", (p.d * (1 - 2 * progress)).toFixed(1) + "px");
      });
    };
    var request = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }

  /* ── Count-up ───────────────────────────────────────────────────────── */
  function initCounters() {
    var els = $$("[data-counter]");
    if (!els.length) return;

    var run = function (el) {
      var to = parseFloat(el.getAttribute("data-counter")) || 0;
      var duration = (parseFloat(el.getAttribute("data-duration")) || 1.6) * 1000;
      // opt-in thousands grouping, so 1000 reads as the brand's "1,000"
      var group = el.hasAttribute("data-separator");
      var fmt = function (n) {
        return group ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : String(n);
      };
      if (reduceMotion) {
        el.textContent = fmt(to);
        return;
      }
      var start = null;
      var ease = function (t) {
        return 1 - Math.pow(1 - t, 3);
      };
      var tick = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        el.textContent = fmt(Math.round(to * ease(p)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      els.forEach(run);
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          run(e.target);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.5 }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ── Accordion ──────────────────────────────────────────────────────── */
  // Height is animated from the measured panel content, so rows can hold any
  // amount of copy without a hard-coded max-height.
  function initAccordions() {
    $$(".accordion").forEach(function (acc) {
      var items = $$(".acc-item", acc);

      var setOpen = function (item, open) {
        var panel = $(".acc-panel", item);
        var trigger = $(".acc-trigger", item);
        item.classList.toggle("is-open", open);
        if (trigger) trigger.setAttribute("aria-expanded", String(open));
        if (!panel) return;
        panel.style.height = open ? panel.scrollHeight + "px" : "0px";
      };

      var openOnly = function (target) {
        items.forEach(function (item) {
          setOpen(item, item === target);
        });
      };

      items.forEach(function (item, i) {
        var trigger = $(".acc-trigger", item);
        if (trigger) {
          trigger.addEventListener("click", function () {
            var isOpen = item.classList.contains("is-open");
            openOnly(isOpen ? null : item);
          });
        }
        // hover-to-open, matching the original interaction
        item.addEventListener("mouseenter", function () {
          if (window.matchMedia("(hover: hover)").matches) openOnly(item);
        });
        // first row starts open
        setOpen(item, i === 0);
      });

      // keep an open panel correctly sized when the layout reflows
      window.addEventListener("resize", function () {
        var open = $(".acc-item.is-open .acc-panel", acc);
        if (open) open.style.height = open.scrollHeight + "px";
      });
    });
  }

  /* ── Click-to-play banner video ─────────────────────────────────────── */
  // The poster shows instantly; the heavy file is only fetched on play.
  function initVideoPlayer() {
    $$(".video-player").forEach(function (player) {
      player.addEventListener("click", function () {
        var src = player.getAttribute("data-src");
        var poster = player.getAttribute("data-poster");
        if (!src) return;
        var video = document.createElement("video");
        video.src = src;
        if (poster) video.poster = poster;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        player.replaceWith(video);
      });
    });
  }

  /* ── Gallery video tiles ────────────────────────────────────────────── */
  // Clips only play while on screen, so a wall of video never decodes at once.
  function initVideoTiles() {
    var tiles = $$(".video-tile");
    if (!tiles.length) return;

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            var video = $("video", e.target);
            if (!video) return;
            if (e.isIntersecting) {
              var p = video.play();
              if (p && p.catch) p.catch(function () {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.35 }
      );
      tiles.forEach(function (t) {
        io.observe(t);
      });
    }

    tiles.forEach(function (tile) {
      tile.addEventListener("click", function () {
        var video = $("video", tile);
        if (!video) return;
        video.muted = !video.muted;
        tile.classList.toggle("is-unmuted", !video.muted);
        var label = tile.getAttribute("data-label") || "clip";
        tile.setAttribute("aria-label", (video.muted ? "Unmute " : "Mute ") + label);
        var on = $(".icon-sound-on", tile);
        var off = $(".icon-sound-off", tile);
        if (on && off) {
          on.style.display = video.muted ? "none" : "block";
          off.style.display = video.muted ? "block" : "none";
        }
      });
    });
  }

  /* ── StarScout: faceted job board ───────────────────────────────────── */
  // Multi-select filters with live facet counts, so a candidate can see how
  // many roles a checkbox would return before spending a click on it.
  function initScout() {
    var root = $("[data-scout]");
    if (!root) return;

    var GROUPS = ["dept", "location", "type"];
    var SAVED_KEY = "startrader:saved-roles";

    var cards = $$(".job-card", root);
    var list = $(".job-list", root);
    var order = cards.slice();
    var empty = $(".results-empty", root);
    var countEl = $("[data-result-count]", root);
    var countWrap = $(".results-count", root);
    var chipsEl = $("[data-active-chips]", root);
    var searchbar = $(".searchbar", root);
    var input = $("#job-search", root);
    var clearAll = $(".filter-clear", root);

    var state = { dept: [], location: [], type: [], query: "" };
    var sort = "default";

    var readSaved = function () {
      try {
        return JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
      } catch (e) {
        return [];
      }
    };
    var writeSaved = function (arr) {
      try {
        localStorage.setItem(SAVED_KEY, JSON.stringify(arr));
      } catch (e) {
        /* private mode — the toggle still works for this session */
      }
    };

    // a job passes when it satisfies every group except the one being counted
    var passes = function (d, ignore) {
      for (var i = 0; i < GROUPS.length; i++) {
        var g = GROUPS[i];
        if (g === ignore) continue;
        if (state[g].length && state[g].indexOf(d[g]) === -1) return false;
      }
      var q = state.query.toLowerCase();
      if (q) {
        var hay = (d.title + " " + d.dept + " " + d.location + " " + d.type).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    };

    var setPanel = function (card, open) {
      var panel = $(".job-panel", card);
      card.classList.toggle("is-open", open);
      $$("[data-job-toggle]", card).forEach(function (b) {
        b.setAttribute("aria-expanded", String(open));
      });
      if (panel) panel.style.height = open ? panel.scrollHeight + "px" : "0px";
    };

    var renderChips = function () {
      if (!chipsEl) return;
      chipsEl.innerHTML = "";
      GROUPS.forEach(function (g) {
        state[g].forEach(function (v) {
          var chip = document.createElement("span");
          chip.className = "active-chip";
          chip.appendChild(document.createTextNode(v));
          var x = document.createElement("button");
          x.type = "button";
          x.setAttribute("aria-label", "Remove " + v + " filter");
          x.innerHTML =
            '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
          x.addEventListener("click", function () {
            var box = $$('.filter-group[data-filter-group="' + g + '"] input', root).filter(function (i) {
              return i.value === v;
            })[0];
            if (box) box.checked = false;
            state[g] = state[g].filter(function (s) {
              return s !== v;
            });
            apply();
          });
          chip.appendChild(x);
          chipsEl.appendChild(chip);
        });
      });
      if (state.query) {
        var qchip = document.createElement("span");
        qchip.className = "active-chip";
        qchip.appendChild(document.createTextNode("“" + state.query + "”"));
        var qx = document.createElement("button");
        qx.type = "button";
        qx.setAttribute("aria-label", "Clear search term");
        qx.innerHTML =
          '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
        qx.addEventListener("click", function () {
          state.query = "";
          if (input) input.value = "";
          if (searchbar) searchbar.classList.remove("has-value");
          syncQuickChips();
          apply();
        });
        qchip.appendChild(qx);
        chipsEl.appendChild(qchip);
      }
    };

    var syncQuickChips = function () {
      $$(".quick-chip", root).forEach(function (c) {
        c.classList.toggle("is-active", c.getAttribute("data-quick") === state.query);
      });
    };

    var apply = function () {
      // visible cards
      var visible = 0;
      cards.forEach(function (card) {
        var ok = passes(card.dataset, null);
        card.hidden = !ok;
        if (ok) visible++;
        else if (card.classList.contains("is-open")) setPanel(card, false);
      });

      // facet counts — how many roles each option would leave
      GROUPS.forEach(function (g) {
        $$('.filter-group[data-filter-group="' + g + '"] .filter-opt', root).forEach(function (opt) {
          var box = $("input", opt);
          var el = $(".filter-count", opt);
          if (!box || !el) return;
          var n = cards.filter(function (c) {
            return c.dataset[g] === box.value && passes(c.dataset, g);
          }).length;
          if (el.textContent !== String(n)) {
            el.textContent = String(n);
            el.classList.add("is-bump");
          }
          opt.classList.toggle("is-empty", n === 0 && !box.checked);
        });
      });

      // the count reads as a small flip rather than a silent swap
      if (countEl && countWrap) {
        if (countEl.textContent !== String(visible)) {
          countWrap.classList.add("is-updating");
          setTimeout(function () {
            countEl.textContent = String(visible);
            countWrap.classList.remove("is-updating");
          }, 180);
        }
      }

      if (empty) empty.hidden = visible > 0;
      if (list) list.hidden = visible === 0;

      var any = state.query || state.dept.length || state.location.length || state.type.length;
      if (clearAll) clearAll.classList.toggle("is-shown", !!any);
      renderChips();
    };

    $$(".filter-count", root).forEach(function (el) {
      el.addEventListener("animationend", function () {
        el.classList.remove("is-bump");
      });
    });

    /* filters */
    GROUPS.forEach(function (g) {
      $$('.filter-group[data-filter-group="' + g + '"] input', root).forEach(function (box) {
        box.addEventListener("change", function () {
          if (box.checked) state[g].push(box.value);
          else
            state[g] = state[g].filter(function (v) {
              return v !== box.value;
            });
          apply();
        });
      });
    });

    var resetAll = function () {
      state = { dept: [], location: [], type: [], query: "" };
      $$(".filter-group input", root).forEach(function (b) {
        b.checked = false;
      });
      if (input) input.value = "";
      if (searchbar) searchbar.classList.remove("has-value");
      syncQuickChips();
      apply();
    };
    if (clearAll) clearAll.addEventListener("click", resetAll);
    var resetBtn = $("[data-reset-filters]", root);
    if (resetBtn) resetBtn.addEventListener("click", resetAll);

    /* search */
    if (input) {
      var onInput = function () {
        state.query = input.value.trim();
        if (searchbar) searchbar.classList.toggle("has-value", input.value.length > 0);
        syncQuickChips();
        apply();
      };
      input.addEventListener("input", onInput);
      input.addEventListener("focus", function () {
        if (searchbar) searchbar.classList.add("is-focused");
      });
      input.addEventListener("blur", function () {
        if (searchbar) searchbar.classList.remove("is-focused");
      });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          input.value = "";
          onInput();
        }
      });
      var clearBtn = $(".searchbar-clear", root);
      if (clearBtn)
        clearBtn.addEventListener("click", function () {
          input.value = "";
          onInput();
          input.focus();
        });
    }

    $$(".quick-chip", root).forEach(function (chip) {
      chip.addEventListener("click", function () {
        var term = chip.getAttribute("data-quick");
        state.query = state.query === term ? "" : term;
        if (input) input.value = state.query;
        if (searchbar) searchbar.classList.toggle("has-value", !!state.query);
        syncQuickChips();
        apply();
        var board = $(".scout-board", root);
        if (board) board.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    /* sort */
    $$("[data-sort]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        sort = btn.getAttribute("data-sort");
        $$("[data-sort]", root).forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        var next =
          sort === "az"
            ? order.slice().sort(function (a, b) {
                return a.dataset.title.localeCompare(b.dataset.title);
              })
            : order;
        next.forEach(function (c) {
          list.appendChild(c);
        });
      });
    });

    /* expand + save */
    var saved = readSaved();
    cards.forEach(function (card) {
      $$("[data-job-toggle]", card).forEach(function (btn) {
        btn.addEventListener("click", function () {
          setPanel(card, !card.classList.contains("is-open"));
        });
      });

      var save = $(".job-save", card);
      if (!save) return;
      var title = card.dataset.title;
      var mark = function (on) {
        save.classList.toggle("is-saved", on);
        save.setAttribute("aria-pressed", String(on));
        save.setAttribute("aria-label", (on ? "Remove " : "Save ") + title + (on ? " from saved roles" : " to saved roles"));
        $("path", save).setAttribute("fill", on ? "currentColor" : "none");
      };
      mark(saved.indexOf(title) > -1);

      save.addEventListener("click", function () {
        var now = readSaved();
        var on = now.indexOf(title) === -1;
        writeSaved(on ? now.concat(title) : now.filter(function (t) { return t !== title; }));
        mark(on);
        save.classList.add("pop");
      });
      save.addEventListener("animationend", function () {
        save.classList.remove("pop");
      });
    });

    // keep an open description correctly sized through a reflow
    window.addEventListener("resize", function () {
      var open = $(".job-card.is-open .job-panel", root);
      if (open) open.style.height = open.scrollHeight + "px";
    });

    apply();
  }

  /* ── Video banner ───────────────────────────────────────────────────── */
  // The file is only fetched on wide viewports with motion allowed; everywhere
  // else the poster carries the hero, so phones never pull a 7MB loop.
  function initVideoHero() {
    var hero = $("[data-video-hero]");
    if (!hero) return;
    var video = $(".video-hero-media", hero);
    if (!video) return;

    var wide = window.matchMedia("(min-width: 768px)").matches;
    if (reduceMotion || !wide) {
      video.remove();
      return;
    }

    video.src = video.getAttribute("data-src");
    video.load();
    var p = video.play();
    if (p && p.catch) p.catch(function () { /* autoplay blocked — poster stands in */ });
  }

  /* ── StarLife showreel ──────────────────────────────────────────────── */
  // A featured banner over a scrolling shelf. Picking a card promotes it to
  // the banner; the shelf takes any number of clips without relayout.
  function initReel() {
    var root = $("[data-reel]");
    if (!root) return;

    var player = $("[data-reel-player]", root);
    var cards = $$(".shelf-card", root);
    var shelf = $("[data-shelf]", root);
    if (!player || !cards.length) return;

    var copy = $("[data-reel-copy]", root);
    var titleEl = $("[data-reel-title]", root);
    var kindEl = $("[data-reel-kind]", root);
    var bar = $("[data-reel-progress]", root);
    var playBtn = $("[data-reel-play]", root);
    var soundBtn = $("[data-reel-sound]", root);
    var at = 0;
    var onSelect = null;

    var swapIcons = function (btn, showFirst) {
      if (!btn) return;
      var a = $(".icon-pause, .icon-sound-off", btn);
      var b = $(".icon-play, .icon-sound-on", btn);
      if (a) a.style.display = showFirst ? "block" : "none";
      if (b) b.style.display = showFirst ? "none" : "block";
    };

    var markPlaying = function (playing) {
      swapIcons(playBtn, playing);
      if (playBtn) {
        playBtn.setAttribute("aria-pressed", String(playing));
        playBtn.setAttribute("aria-label", (playing ? "Pause" : "Play") + " clip");
      }
    };

    var select = function (i, autoplay) {
      at = ((i % cards.length) + cards.length) % cards.length;
      var d = cards[at].dataset;

      cards.forEach(function (c, n) {
        c.classList.toggle("is-active", n === at);
        c.setAttribute("aria-selected", String(n === at));
      });
      if (onSelect) onSelect();

      if (copy) copy.classList.add("is-swapping");
      setTimeout(function () {
        if (titleEl) titleEl.textContent = d.title;
        if (kindEl) kindEl.textContent = d.kind;
        if (copy) copy.classList.remove("is-swapping");
      }, 200);

      var poster = $("img", cards[at]);
      if (poster) player.poster = poster.getAttribute("src");
      player.src = d.src;
      player.load();
      if (bar) bar.style.width = "0%";

      if (autoplay) {
        var p = player.play();
        if (p && p.then) p.then(function () { markPlaying(true); }).catch(function () { markPlaying(false); });
      }
    };

    cards.forEach(function (c, i) {
      c.addEventListener("click", function () {
        select(i, true);
      });
    });

    if (playBtn) {
      playBtn.addEventListener("click", function () {
        if (player.paused) {
          var p = player.play();
          if (p && p.then) p.then(function () { markPlaying(true); }).catch(function () {});
        } else {
          player.pause();
          markPlaying(false);
        }
      });
    }

    if (soundBtn) {
      soundBtn.addEventListener("click", function () {
        player.muted = !player.muted;
        soundBtn.setAttribute("aria-pressed", String(!player.muted));
        soundBtn.setAttribute("aria-label", (player.muted ? "Unmute" : "Mute") + " clip");
        swapIcons(soundBtn, player.muted);
      });
    }

    player.addEventListener("timeupdate", function () {
      if (!bar || !player.duration || !isFinite(player.duration)) return;
      bar.style.width = (player.currentTime / player.duration) * 100 + "%";
    });
    player.addEventListener("play", function () { markPlaying(true); });
    player.addEventListener("pause", function () { markPlaying(false); });
    // roll into the next clip so the reel keeps moving on its own
    player.addEventListener("ended", function () {
      select(at + 1, true);
    });

    /* shelf: drifts on its own, yields the moment you touch it */
    if (shelf) {
      var originals = cards.length;
      // a second copy makes the wrap invisible
      cards.forEach(function (c) {
        var clone = c.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.setAttribute("tabindex", "-1");
        clone.removeAttribute("role");
        clone.removeAttribute("aria-selected");
        clone.dataset.clone = "1";
        shelf.appendChild(clone);
      });

      var all = $$(".shelf-card", shelf);
      all.forEach(function (c, i) {
        c.addEventListener("click", function () {
          select(i % originals, true);
        });
      });

      // keep clones in step with the original they mirror
      var syncClones = function () {
        all.forEach(function (c, i) {
          var on = i % originals === at;
          c.classList.toggle("is-active", on);
          if (!c.dataset.clone) c.setAttribute("aria-selected", String(on));
        });
      };
      onSelect = syncClones;

      var hovering = false;
      var keyFocus = false;
      var holdFor = 0;
      var hold = function (ms) {
        holdFor = ms;
      };
      var isPaused = function () {
        return hovering || keyFocus || holdFor > 0;
      };

      shelf.addEventListener("pointerenter", function () { hovering = true; });
      shelf.addEventListener("pointerleave", function () { hovering = false; });
      // focus arriving without a pointer over the shelf means keyboard use
      shelf.addEventListener("focusin", function () { if (!hovering) keyFocus = true; });
      shelf.addEventListener("focusout", function () { keyFocus = false; });
      // a manual flick wins; drifting resumes shortly after
      shelf.addEventListener("wheel", function () { hold(1200); }, { passive: true });
      shelf.addEventListener("touchstart", function () { hovering = true; }, { passive: true });
      shelf.addEventListener("touchend", function () { hovering = false; hold(1600); }, { passive: true });

      if (!reduceMotion) {
        // scrollLeft snaps to whole pixels, so a sub-pixel step written straight
        // back would be rounded away every frame — accumulate in a float instead
        var pos = shelf.scrollLeft;
        var SPEED = 0.05; // px per ms
        shelf.addEventListener("scroll", function () {
          if (Math.abs(shelf.scrollLeft - pos) > 2) pos = shelf.scrollLeft;
        }, { passive: true });

        var last = 0;
        var drift = function (ts) {
          var dt = Math.min(last ? ts - last : 16, 64);
          last = ts;
          if (holdFor > 0) holdFor -= dt;
          if (!isPaused()) {
            var half = shelf.scrollWidth / 2;
            pos += dt * SPEED;
            if (pos >= half) pos -= half;
            shelf.scrollLeft = pos;
          }
          requestAnimationFrame(drift);
        };
        requestAnimationFrame(drift);
      }
    }

    // only play while the banner is on screen
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              var p = player.play();
              if (p && p.catch) p.catch(function () {});
            } else {
              player.pause();
            }
          });
        },
        { threshold: 0.3 }
      );
      io.observe($(".reel-feature", root) || player);
    }

    select(0, false);
  }

  /* ── Products bento ─────────────────────────────────────────────────── */
  // Three pieces: a pointer spotlight, a segmented control over real figures,
  // and a platform carousel. Every value shown is one the site already states.
  function initProductBento() {
    var root = $("[data-pbento]");
    if (!root) return;

    /* pointer-tracked light on every cell */
    if (!reduceMotion) {
      $$(".pb-card", root).forEach(function (card) {
        card.addEventListener("pointermove", function (e) {
          var r = card.getBoundingClientRect();
          card.style.setProperty("--mx", (e.clientX - r.left).toFixed(0) + "px");
          card.style.setProperty("--my", (e.clientY - r.top).toFixed(0) + "px");
        });
      });
    }

    /* glyph field — texture that re-scatters per segment, not a data readout */
    var panel = $("[data-pb-panel]", root);
    if (panel) {
      var field = $(".pb-glyphs", panel);
      var GLYPHS = 18;
      if (field && !field.children.length) {
        for (var i = 0; i < GLYPHS; i++) field.appendChild(document.createElement("i"));
      }
      var glyphs = field ? $$("i", field) : [];

      var SEGMENTS = [
        { on: 12, figure: "0.0", unit: "from", pill: "Spreads from 0.0" },
        { on: 16, figure: "1:1000", unit: "up to", pill: "Leverage up to 1:1000" },
        { on: 9, figure: "4", unit: "ways to trade", pill: "MT4 · MT5 · Web · App" },
      ];

      var figure = $("[data-pb-figure]", panel);
      var unit = $("[data-pb-unit]", panel);
      var pill = $("[data-pb-pill]", panel);

      var paint = function (i) {
        var s = SEGMENTS[i];
        glyphs.forEach(function (g, n) {
          g.classList.toggle("is-on", n < s.on);
          g.style.transitionDelay = (n * 0.012).toFixed(3) + "s";
        });
        if (figure) figure.textContent = s.figure;
        if (unit) unit.textContent = s.unit;
        if (pill) pill.textContent = s.pill;
      };

      $$("[data-seg]", panel).forEach(function (btn) {
        btn.addEventListener("click", function () {
          $$("[data-seg]", panel).forEach(function (b) {
            b.classList.toggle("is-active", b === btn);
            b.setAttribute("aria-selected", String(b === btn));
          });
          paint(parseInt(btn.getAttribute("data-seg"), 10) || 0);
        });
      });
      paint(0);
    }

    /* platform carousel */
    var slider = $("[data-pb-slider]", root);
    if (slider) {
      var PLATFORMS = [
        { tag: "MetaTrader 4", body: "The industry standard. Expert Advisors, custom indicators and a workspace traders already know inside out." },
        { tag: "MetaTrader 5", body: "More timeframes, more order types and a deeper toolset for multi-asset strategies." },
        { tag: "WebTrader", body: "Full charting in the browser. Nothing to install — sign in and the workspace is already there." },
        { tag: "Mobile app", body: "Positions, alerts and charts in your pocket, synced with every other platform." },
      ];
      var tag = $("[data-slide-tag]", slider);
      var body = $("[data-slide-body]", slider);
      var idx = $("[data-slide-index]", slider);
      var pips = $$(".pb-avatars span", slider);
      var at = 0;

      var show = function (n) {
        at = ((n % PLATFORMS.length) + PLATFORMS.length) % PLATFORMS.length;
        var p = PLATFORMS[at];
        if (body) body.classList.add("is-swapping");
        setTimeout(function () {
          if (tag) tag.textContent = p.tag;
          if (body) {
            body.textContent = p.body;
            body.classList.remove("is-swapping");
          }
        }, 180);
        if (idx) idx.textContent = String(at + 1);
        pips.forEach(function (s, n) {
          s.classList.toggle("is-active", n === at);
        });
      };

      var prev = $("[data-slide-prev]", slider);
      var next = $("[data-slide-next]", slider);
      if (prev) prev.addEventListener("click", function () { show(at - 1); });
      if (next) next.addEventListener("click", function () { show(at + 1); });
      show(0);
    }
  }

  /* ── Jurisdictions ──────────────────────────────────────────────────── */
  // One licence open at a time, so the regulatory copy is never a wall.
  function initJurisdictions() {
    var root = $("[data-jurisdictions]");
    if (!root) return;
    var rows = $$(".jur", root);
    if (!rows.length) return;

    var open = function (i) {
      rows.forEach(function (row, n) {
        var on = n === i;
        row.classList.toggle("is-active", on);
        var btn = $("button", row);
        if (btn) btn.setAttribute("aria-expanded", String(on));
        var panel = $(".jur-reveal", row);
        if (panel) panel.style.height = on ? panel.scrollHeight + "px" : "0px";
      });
    };

    rows.forEach(function (row, i) {
      var btn = $("button", row);
      if (btn) {
        btn.addEventListener("click", function () {
          open(row.classList.contains("is-active") ? -1 : i);
        });
      }
    });

    window.addEventListener("resize", function () {
      var el = $(".jur.is-active .jur-reveal", root);
      if (el) el.style.height = el.scrollHeight + "px";
    });

    open(0);
  }

  /* ── "More than careers" traits ─────────────────────────────────────── */
  // Selecting a trait cross-fades the visual and opens its copy, so the two
  // halves of the section always describe the same thing.
  function initTraits() {
    var root = $("[data-traits]");
    if (!root) return;

    var rows = $$(".trait", root);
    var shots = $$(".traits-shot", root);
    var ticks = $$(".traits-ticks span", root);
    var capIndex = $("[data-caption-index]", root);
    var capText = $("[data-caption-text]", root);
    if (!rows.length) return;

    var pad = function (n) {
      return (n < 10 ? "0" : "") + n;
    };

    var select = function (i) {
      rows.forEach(function (row, n) {
        var on = n === i;
        row.classList.toggle("is-active", on);
        var btn = $("button", row);
        if (btn) btn.setAttribute("aria-expanded", String(on));
        var panel = $(".trait-reveal", row);
        if (panel) panel.style.height = on ? panel.scrollHeight + "px" : "0px";
      });
      shots.forEach(function (s, n) {
        s.classList.toggle("is-active", n === i);
      });
      ticks.forEach(function (t, n) {
        t.classList.toggle("is-active", n === i);
      });
      if (capIndex) capIndex.textContent = pad(i + 1) + " / " + pad(rows.length);
      var title = $(".trait-title", rows[i]);
      if (capText && title) capText.textContent = title.textContent.trim();
    };

    rows.forEach(function (row, i) {
      var btn = $("button", row);
      if (btn) btn.addEventListener("click", function () { select(i); });
      row.addEventListener("mouseenter", function () {
        if (window.matchMedia("(hover: hover)").matches) select(i);
      });
    });

    // keep the open row correctly sized through a reflow
    window.addEventListener("resize", function () {
      var open = $(".trait.is-active .trait-reveal", root);
      if (open) open.style.height = open.scrollHeight + "px";
    });

    select(0);
  }

  /* ── Scroll-drawn process timeline ──────────────────────────────────── */
  function initTimeline() {
    var track = $("[data-timeline]");
    if (!track) return;
    var steps = $$(".journey-step", track);

    if (reduceMotion) {
      track.style.setProperty("--progress", "1");
      steps.forEach(function (s) {
        s.classList.add("is-active");
      });
      return;
    }

    var ticking = false;
    var update = function () {
      ticking = false;
      var r = track.getBoundingClientRect();
      var vh = window.innerHeight;
      // 0 when the track's top reaches 80% down the viewport, 1 once its
      // bottom clears the middle — the line fills as you read the steps
      var p = (vh * 0.8 - r.top) / (r.height + vh * 0.3);
      p = Math.max(0, Math.min(1, p));
      track.style.setProperty("--progress", p.toFixed(3));
      steps.forEach(function (s, i) {
        s.classList.toggle("is-active", p >= (i + 0.35) / steps.length);
      });
    };
    var request = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }

  /* ── StarBlog: category tabs + pagination ───────────────────────────── */
  function initBlogIndex() {
    var root = $("[data-blog-index]");
    if (!root) return;

    var PAGE_SIZE = 6;
    var cards = $$("[data-post]", root);
    var tabs = $$(".blog-tab", root);
    var pager = $(".blog-pagination", root);
    var gridTop = $(".blog-grid-top", root);
    var tab = "All";
    var page = 1;

    var matching = function () {
      return cards.filter(function (c) {
        return tab === "All" || (c.getAttribute("data-category") || "").toLowerCase() === tab.toLowerCase();
      });
    };

    var renderPager = function (total) {
      if (!pager) return;
      pager.innerHTML = "";
      if (total <= 1) {
        pager.hidden = true;
        return;
      }
      pager.hidden = false;

      var button = function (label, targetPage, opts) {
        var b = document.createElement("button");
        b.textContent = label;
        b.type = "button";
        if (opts && opts.arrow) {
          b.className = "page-arrow";
          b.setAttribute("aria-label", opts.label);
        }
        if (opts && opts.disabled) b.disabled = true;
        if (opts && opts.current) {
          b.classList.add("is-current");
          b.setAttribute("aria-current", "true");
        }
        b.addEventListener("click", function () {
          go(targetPage);
        });
        return b;
      };

      pager.appendChild(button("‹", page - 1, { arrow: true, label: "Previous page", disabled: page === 1 }));
      for (var i = 1; i <= total; i++) {
        pager.appendChild(button(String(i), i, { current: i === page }));
      }
      pager.appendChild(button("›", page + 1, { arrow: true, label: "Next page", disabled: page === total }));
    };

    var first = true;
    var render = function () {
      var list = matching();
      var total = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
      page = Math.min(Math.max(1, page), total);
      var from = (page - 1) * PAGE_SIZE;

      cards.forEach(function (c) {
        c.hidden = true;
      });
      list.slice(from, from + PAGE_SIZE).forEach(function (c, i) {
        c.hidden = false;
        c.style.transitionDelay = (i * 0.05).toFixed(2) + "s";
        // On load the scroll observer handles the entrance; after a tab or page
        // change the cards are already past it, so reveal them here.
        if (!first) c.classList.add("is-visible");
      });
      renderPager(total);
      first = false;
    };

    var go = function (p) {
      page = p;
      render();
      if (gridTop) gridTop.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        tab = btn.getAttribute("data-tab") || "All";
        page = 1;
        tabs.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-selected", String(b === btn));
        });
        render();
      });
    });

    render();
  }

  /* ── Starcast player ────────────────────────────────────────────────── */
  // A single hidden <video> is the audio engine; the cards are the UI.
  function initStarcast() {
    var root = $("[data-starcast]");
    if (!root) return;

    var media = $(".starcast-media", root);
    var episodes = $$(".episode", root);
    if (!media || !episodes.length) return;

    var index = 0;
    var playing = false;
    var scrubbing = false;

    var featured = {
      thumb: $(".starcast-thumb img", root),
      kicker: $(".starcast-kicker", root),
      title: $(".starcast-head h3", root),
      guest: $(".starcast-guest", root),
      excerpt: $(".starcast-excerpt", root),
    };
    var timeLabel = $(".starcast-time", root);
    var fill = $(".seek-fill", root);
    var thumbEl = $(".seek-thumb", root);
    var seek = $(".seek", root);
    var playBtn = $(".transport-play", root);

    // decorative signal strip
    var signal = $(".signal", root);
    if (signal) {
      var seeds = [0.45, 0.8, 0.6, 1, 0.55, 0.9, 0.7];
      for (var i = 0; i < 40; i++) {
        var bar = document.createElement("i");
        var seed = seeds[i % seeds.length];
        bar.style.setProperty("--sig-h", Math.round(40 + seed * 55) + "%");
        bar.style.animationDelay = ((i % 8) * 0.06).toFixed(2) + "s";
        bar.style.animationDuration = (0.5 + seed * 0.6).toFixed(2) + "s";
        signal.appendChild(bar);
      }
    }

    var fmt = function (t) {
      if (!isFinite(t) || t < 0) t = 0;
      var m = Math.floor(t / 60);
      var s = Math.floor(t % 60);
      return m + ":" + (s < 10 ? "0" : "") + s;
    };

    var setPlayIcon = function (btn, isPlaying) {
      if (!btn) return;
      var pause = $(".icon-pause", btn);
      var play = $(".icon-play", btn);
      if (pause) pause.style.display = isPlaying ? "block" : "none";
      if (play) play.style.display = isPlaying ? "none" : "block";
    };

    var syncUI = function () {
      root.classList.toggle("is-playing", playing);
      episodes.forEach(function (ep, i) {
        var current = i === index;
        ep.classList.toggle("is-current", current);
        ep.classList.toggle("is-playing", current && playing);
        ep.setAttribute("aria-current", String(current));
        setPlayIcon($(".episode-play", ep), current && playing);
        var dur = $(".episode-dur", ep);
        if (dur) dur.textContent = current && media.duration ? fmt(media.duration) : "Listen";
      });
      setPlayIcon(playBtn, playing);
      if (playBtn) playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
    };

    var loadEpisode = function (i, autoplay) {
      index = ((i % episodes.length) + episodes.length) % episodes.length;
      var d = episodes[index].dataset;
      if (featured.thumb) featured.thumb.src = d.thumb;
      if (featured.kicker) featured.kicker.textContent = "Featured · Episode " + d.n;
      if (featured.title) featured.title.textContent = d.title;
      if (featured.guest) featured.guest.textContent = d.guest;
      if (featured.excerpt) featured.excerpt.textContent = d.excerpt;

      media.src = d.src;
      media.load();
      if (fill) fill.style.width = "0%";
      if (thumbEl) thumbEl.style.left = "0%";
      if (timeLabel) timeLabel.textContent = "0:00 / 0:00";

      if (autoplay) {
        var p = media.play();
        if (p && p.then) {
          p.then(function () {
            playing = true;
            syncUI();
          }).catch(function () {
            playing = false;
            syncUI();
          });
        }
      }
      syncUI();
    };

    var toggle = function () {
      if (playing) {
        media.pause();
        playing = false;
        syncUI();
      } else {
        var p = media.play();
        if (p && p.then) {
          p.then(function () {
            playing = true;
            syncUI();
          }).catch(function () {
            playing = false;
            syncUI();
          });
        }
      }
    };

    if (playBtn) playBtn.addEventListener("click", toggle);
    var prev = $(".transport-prev", root);
    var next = $(".transport-next", root);
    if (prev) prev.addEventListener("click", function () { loadEpisode(index - 1, true); });
    if (next) next.addEventListener("click", function () { loadEpisode(index + 1, true); });

    episodes.forEach(function (ep, i) {
      ep.addEventListener("click", function () {
        if (i === index) toggle();
        else loadEpisode(i, true);
      });
    });

    media.addEventListener("loadedmetadata", syncUI);
    media.addEventListener("ended", function () {
      loadEpisode(index + 1, true);
    });
    media.addEventListener("timeupdate", function () {
      if (scrubbing) return;
      var d = media.duration;
      var ratio = d && isFinite(d) ? media.currentTime / d : 0;
      if (fill) fill.style.width = ratio * 100 + "%";
      if (thumbEl) thumbEl.style.left = ratio * 100 + "%";
      if (timeLabel) timeLabel.textContent = fmt(media.currentTime) + " / " + fmt(d);
    });

    if (seek) {
      var seekTo = function (ratio) {
        var d = media.duration;
        if (!d || !isFinite(d)) return;
        var r = Math.max(0, Math.min(1, ratio));
        media.currentTime = r * d;
        if (fill) fill.style.width = r * 100 + "%";
        if (thumbEl) thumbEl.style.left = r * 100 + "%";
        if (timeLabel) timeLabel.textContent = fmt(media.currentTime) + " / " + fmt(d);
      };
      var ratioFromX = function (clientX) {
        var r = seek.getBoundingClientRect();
        return (clientX - r.left) / r.width;
      };

      seek.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        scrubbing = true;
        seek.setPointerCapture(e.pointerId);
        seekTo(ratioFromX(e.clientX));
      });
      seek.addEventListener("pointermove", function (e) {
        if (!scrubbing) return;
        seekTo(ratioFromX(e.clientX));
      });
      seek.addEventListener("pointerup", function (e) {
        scrubbing = false;
        seek.releasePointerCapture(e.pointerId);
      });
      seek.addEventListener("keydown", function (e) {
        var d = media.duration;
        if (!d || !isFinite(d)) return;
        var current = media.currentTime / d;
        var step = 5 / d;
        if (e.key === "ArrowRight") { e.preventDefault(); seekTo(current + step); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); seekTo(current - step); }
        else if (e.key === "Home") { e.preventDefault(); seekTo(0); }
        else if (e.key === "End") { e.preventDefault(); seekTo(1); }
      });
    }

    loadEpisode(0, false);
  }

  /* ── Article table of contents ──────────────────────────────────────── */
  function initArticleToc() {
    var toc = $(".article-toc");
    if (!toc) return;

    var links = $$("a[href^='#']", toc);
    if (!links.length) return;

    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var el = document.getElementById(link.getAttribute("href").slice(1));
        if (!el) return;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
      });
    });

    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (e) {
            return e.isIntersecting;
          })
          .sort(function (a, b) {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });
        if (!visible[0]) return;
        var id = visible[0].target.id;
        links.forEach(function (l) {
          l.classList.toggle("is-active", l.getAttribute("href") === "#" + id);
        });
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] }
    );
    links.forEach(function (l) {
      var el = document.getElementById(l.getAttribute("href").slice(1));
      if (el) io.observe(el);
    });
  }

  /* ── Boot ───────────────────────────────────────────────────────────── */
  function boot() {
    initNav();
    initReveal();
    initParallax();
    initCounters();
    initAccordions();
    initVideoPlayer();
    initVideoTiles();
    initScout();
    initVideoHero();
    initReel();
    initProductBento();
    initJurisdictions();
    initTraits();
    initTimeline();
    initBlogIndex();
    initStarcast();
    initArticleToc();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

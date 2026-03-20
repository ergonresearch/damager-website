// DAMAGER Website — Main JavaScript

(function () {
  'use strict';

  // ── Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        mobileNav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Project progress bar
  // Calculates the percentage of the project duration elapsed
  function initProgressBar() {
    var bars = document.querySelectorAll('[data-progress-bar]');
    if (!bars.length) return;

    var start = new Date('2025-12-01T00:00:00Z');
    var end   = new Date('2029-11-30T00:00:00Z');
    var now   = new Date();

    var total   = end - start;
    var elapsed = now - start;
    var pct     = Math.max(0, Math.min(100, Math.round(elapsed / total * 100)));
    var months  = Math.max(0, Math.floor(elapsed / (1000 * 60 * 60 * 24 * 30.44)));

    bars.forEach(function (bar) {
      var fill   = bar.querySelector('[data-progress-fill]');
      var label  = bar.querySelector('[data-progress-label]');
      var months_el = bar.querySelector('[data-progress-months]');

      if (fill)  { fill.style.width = pct + '%'; }
      if (label) { label.textContent = pct + '%'; }
      if (months_el) {
        months_el.textContent = months + ' of 48 months completed';
      }
    });
  }

  // ── Timeline progress
  function initTimeline() {
    var timeline = document.querySelector('[data-timeline]');
    if (!timeline) return;

    var start = new Date('2025-12-01T00:00:00Z');
    var end   = new Date('2029-11-30T00:00:00Z');
    var now   = new Date();

    var total   = end - start;
    var elapsed = now - start;
    var pct     = Math.max(0, Math.min(100, Math.round(elapsed / total * 100)));

    var progressLine = timeline.querySelector('[data-timeline-progress]');
    var plane        = timeline.querySelector('[data-timeline-plane]');
    var dots         = timeline.querySelectorAll('[data-milestone-month]');

    // Set progress line width
    if (progressLine) { progressLine.style.width = pct + '%'; }

    // Position airplane
    if (plane) { plane.style.left = pct + '%'; }

    // Mark milestones as past/current; hide dot when drone is directly over it
    var totalMonths = 48;
    dots.forEach(function (dot) {
      var month = parseInt(dot.getAttribute('data-milestone-month'), 10);
      var milestonePct = Math.round(month / totalMonths * 100);
      var milestone = dot.closest('.timeline__milestone');

      if (milestonePct < pct) {
        milestone.classList.add('is-past');
      } else if (milestonePct <= pct + 3) {
        milestone.classList.add('is-current');
      }

    });

    // Hide the last black dot (closest past milestone to the drone)
    var pastDots = timeline.querySelectorAll('.timeline__milestone.is-past .timeline__dot');
    if (pastDots.length > 0) {
      pastDots[pastDots.length - 1].classList.add('is-drone-at');
    }
  }

  // ── Tab navigation (Media page)
  function initTabs() {
    var tabNavs = document.querySelectorAll('.tab-nav');
    tabNavs.forEach(function (nav) {
      var items  = nav.querySelectorAll('.tab-nav__item');
      var panels = document.querySelectorAll('.tab-panel');

      items.forEach(function (item) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          var target = item.getAttribute('data-tab');

          items.forEach(function (i) { i.classList.remove('is-active'); });
          panels.forEach(function (p) { p.classList.remove('is-active'); });

          item.classList.add('is-active');
          var panel = document.querySelector('[data-tab-panel="' + target + '"]');
          if (panel) { panel.classList.add('is-active'); }
        });
      });
    });
  }

  // ── Init on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initProgressBar();
    initTimeline();
    initTabs();
  });

}());

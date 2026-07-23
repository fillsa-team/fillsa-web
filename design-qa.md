# Fillsa Landing Design QA

## Scope

- Reference: `docs/(최종레퍼)fillsa-landing.html`
- Implementation: `http://127.0.0.1:4174/`
- Reference captures:
  - `/private/tmp/fillsa-reference-1440x900.png`
  - `/private/tmp/fillsa-reference-390x844.png`
- Implementation captures:
  - `/private/tmp/fillsa-react-1440x900.png`
  - `/private/tmp/fillsa-react-390x844.png`
- Compared viewports: 1280×720, 1440×900, 390×844

## Comparison method

The reference and React implementation were opened in the same in-app browser, aligned to the same viewport and section state, and captured together for direct visual comparison. Dynamic typewriter and marquee phases were treated as expected timing differences.

## Iterations

1. The first desktop comparison found a hero line-wrap mismatch caused by a different font-family token. The landing font token was changed to the exact reference stack.
2. The AI sentence chips were shorter than the reference because native button line-height differed from the reference `div`. The chip line-height was aligned to the reference.
3. The final comparison matched the approved reference at desktop and mobile widths. At 1440px, section boundaries for themes, new features, how-to, and download matched the reference measurements.

## Interaction and responsive checks

- Mobile navigation opens, closes, and closes after selecting an anchor.
- Navigation background changes after the 20px scroll threshold.
- Typewriter animation loops without duplicate timers.
- Theme marquee uses the reference duration and pauses on hover.
- All three AI sentence chips update the quote, source, question, and answer preview.
- New-tab links include `noopener noreferrer`.
- Fade-up observer, scroll listener, and timers clean up correctly.
- Browser console has no application errors.
- The reference-only `ai-chat-status` null error is absent.

## Findings

- P0: none
- P1: none
- P2: none
- P3: none

final result: passed

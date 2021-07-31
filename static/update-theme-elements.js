
  (function updateThemeElements(){
    enableTheme(
      returnThemeBasedOnLocalStorage() ||
      returnThemeBasedOnOS() ||
      returnThemeBasedOnTime(),
      false)
  }())

  // If no preference was set, check what the OS pref is.
  function returnThemeBasedOnOS() {
    let mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
    if (mediaQueryList.matches) return 'dark'
      else {
      mediaQueryList = window.matchMedia('(prefers-color-scheme: light)')
      if (mediaQueryList.matches) return 'light'
      else return undefined
      }
  }
  
  // For subsequent page loads
  function returnThemeBasedOnLocalStorage() {
    const pref = localStorage.getItem('preference-theme')
    const lastChanged = localStorage.getItem('preference-theme-last-change')
    let now = new Date()
    now = now.getTime()
    const minutesPassed = (now - lastChanged)/(1000*60)
  
    if (
      minutesPassed < 120 &&
      pref === "light"
    ) return 'light'
    else if (
      minutesPassed < 120 &&
      pref === "dark"
    ) return 'dark'
    else return undefined
  }
  
  // Fallback for when OS preference isn't available
  function returnThemeBasedOnTime(){
    let date = new Date
    const hour = date.getHours()
    if (hour > 20 || hour < 5) return 'dark'
    else return 'light'
  }
  
  // Switch to another theme
  function enableTheme(newTheme = 'light', withTransition = false, save = true){
    const root = document.documentElement
    let otherTheme
    newTheme === 'light' ? otherTheme = 'dark' : otherTheme = 'light'
    let currentTheme
    (root.classList.contains('theme-dark')) ? currentTheme = 'dark' : currentTheme = 'light'
  
    if (withTransition === true && newTheme !== currentTheme) animateThemeTransition()
  
    root.classList.add('theme-' + newTheme)
    root.classList.remove('theme-' + otherTheme)
  
    let button = document.getElementById('theme-' + otherTheme + '-button')
    button.classList.add('enabled')
    button.setAttribute('aria-pressed', false)
  
    button = document.getElementById('theme-' + newTheme + '-button')
    button.classList.remove('enabled')
    button.setAttribute('aria-pressed', true)
  
    if (save) saveToLocalStorage('preference-theme', newTheme)
  }
  
  // Save the state for subsequent page loads
  function saveToLocalStorage(key, value){
    let now = new Date()
    now = now.getTime()
    localStorage.setItem(key, value)
    localStorage.setItem(key+"-last-change", now)
  }
  
  // Add class to smoothly transition between themes
  function animateThemeTransition(){
    const root = document.documentElement
    root.classList.remove('theme-change-active')
    void root.offsetWidth // Trigger reflow to cancel the animation
    root.classList.add('theme-change-active')
  }
  (function removeAnimationClass(){
    const root = document.documentElement
    root.addEventListener(supportedAnimationEvent(), ()=>root.classList.remove('theme-change-active'), false)
  }())
  
  function supportedAnimationEvent(){
    const el = document.createElement("f")
    const animations = {
      "animation"      : "animationend",
      "OAnimation"     : "oAnimationEnd",
      "MozAnimation"   : "animationend",
      "WebkitAnimation": "webkitAnimationEnd"
    }
  
    for (t in animations){
      if (el.style[t] !== undefined) return animations[t]   // Return the name of the event fired by the browser to indicate a CSS animation has ended
    }
  }
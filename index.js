const addTabBtn = document.getElementById("add-tab-btn"); //add button element
const tabsContainer = document.getElementById("tabs"); // tabes container
let angle = 10;
addTabBtn.addEventListener("click", () => {
  //adding event listener for add button
  angle += 10;
  const navTab = document.createElement("div"); //navtab element
  const navHeader = document.createElement("div"); // nav headder element
  navHeader.classList.add("justify-between"); // adding space between hedder and x element
  const title = document.createElement("span"); //tab title element
  title.textContent = "New Tab"; //default new tab as title
  title.addEventListener("click", (e) => {
    //eventlistener for active tab when clicked
    document.querySelectorAll(".frame-div").forEach((item) => {
      item.classList.remove("display-content"); //removing default active for all iframes
    });
    document.querySelectorAll(".newtab-style").forEach((item) => {
      item.classList.remove("tab-active"); // removine active for all clicked tabs
    });

    e.target.parentElement.parentElement
      .querySelector(".frame-div")
      .classList.add("display-content"); //showing iframe that only ckicked
    e.target.parentElement.parentElement.classList.add("tab-active"); //showing active tab that only ckicked
  });
  navHeader.appendChild(title); // adding title to navtab
  navTab.classList.add("newtab-style");
  const closeButton = document.createElement("span"); // close tab element
  closeButton.classList.add("close-btn");
  closeButton.textContent = "X";

  closeButton.addEventListener("click", () => {
    //event listner for close tab element
    navTab.remove();
  });

  navHeader.append(closeButton); //adding close to navtab

  let tab = document.createElement("div"); //i-frame div element
  tab.classList.add("frame-div");
  tab.addEventListener("click", (event) => {
    // i think event bubbling happens so safeside removed thet using stoppropagation
    event.stopPropagation();
  });
  const gradient = `linear-gradient(${angle}deg, rgb(146, 146, 223) 50%, rgb(231, 159, 159) 50%)`;
  tab.style.backgroundImage = gradient; // i thought we can change background color andle that wecan differenciate each iframe

  const iframe = document.createElement("iframe"); // iframe element
  iframe.src = "about:blank";
  iframe.classList.add("iframe-container");

  const inputele = document.createElement("input"); // input element
  inputele.placeholder = "Enter URL";
  inputele.addEventListener("keydown", (event) => {
    //we inject url to iframe when we press eneter
    event.stopPropagation();
    if (event.key === "Enter") {
      iframe.src = inputele.value;
      if (inputele.value.length > 20) {
        // the tab text length is more it going too long so i sliced upto 20 chars
        title.textContent = inputele.value.slice(0, 20);
      } else {
        title.textContent = inputele.value;
      }
    }
  });

  tab.appendChild(iframe); // adding i frame to tab element
  tab.appendChild(inputele); // adding input element to tablement
  navHeader.removeEventListener("click", (e) => {
    // i think event bubbling happens so safeside removed thet using stoppropagation
    e.stopPropagation();
  });
  navTab.appendChild(navHeader);
  navTab.appendChild(tab);

  tabsContainer.appendChild(navTab);

  if (!tabsContainer.querySelector(".newtab-style.tab-active")) {
    // condition for default one active tab at initial stage
    navTab.classList.add("tab-active");
    tab.classList.add("display-content");
  }
});

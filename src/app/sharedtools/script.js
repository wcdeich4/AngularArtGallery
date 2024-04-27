import './index.html';
import './about.html';
import './ZXY.html';
import './styles.css';
import './public/favicon.ico'

function openNav()
  {
    document.getElementById("mySidenav").style.display = "block";
    document.getElementById("myHamburgerIconId").style.display = "none";
  }

  function closeNav()
  {
    document.getElementById("mySidenav").style.display = "none";
    document.getElementById("myHamburgerIconId").style.display = "block";
  }

  window.onload = function(event)
  {
    console.log(window.location.search );

    if (window.location.search != null && window.location.search.toLowerCase().includes('about'))
    {
      document.getElementById('menuIFrameId').src = "About.html";
    }
  }


//   let worker = new Worker(new URL('./models/experimental.worker', import.meta.url));
//   worker.postMessage('test data');
// worker.onmessage = ({ data }) => {
//   let parsedData = null;
//   try {
//     parsedData = JSON.parse(data);
//   } catch (e) {
//     parsedData = data;
//   }
//   alert(data);
//   console.log(parsedData);
// }


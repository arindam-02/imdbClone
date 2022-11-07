import "../footer/Footer.css";

function Footer() {
  const clock = setInterval(() => {
    let d = new Date();
    let date = " " + d.toDateString() + " " + d.toLocaleTimeString();
    document.getElementById("clk").innerHTML = date;
  }, 1000);

  return (
    <>
      <div className="footer ">
        <p className="text-warning text-center m-0 pb-3">
          Made With ❤ by Das ||
          <span id="clk"></span>
        </p>
      </div>
    </>
  );
}
export default Footer;

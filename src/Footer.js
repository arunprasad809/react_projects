function Footer() {
  const year = new Date();
  return (
    <div className="footer">
      <p style={{ margin: "10px 0px" }}>
        Copyright &copy; {year.getFullYear()}
      </p>
    </div>
  );
}

export default Footer;

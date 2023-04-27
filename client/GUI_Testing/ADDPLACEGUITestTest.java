import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class ADDPLACEGUITestTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void aDDPLACEGUITest() {
    driver.get("http://127.0.0.1:5173/");
    driver.manage().window().setSize(new Dimension(1552, 840));
    driver.findElement(By.linkText("Somin Gandhi")).click();
    driver.findElement(By.linkText("My accommodations")).click();
    driver.findElement(By.linkText("Add new place")).click();
    driver.findElement(By.cssSelector("input:nth-child(3)")).click();
    driver.findElement(By.cssSelector("input:nth-child(3)")).sendKeys("nejfhfhfh");
    driver.findElement(By.cssSelector("input:nth-child(6)")).click();
    driver.findElement(By.cssSelector("input:nth-child(6)")).sendKeys("knofiohfuhioji");
    driver.findElement(By.cssSelector("input:nth-child(9)")).click();
    driver.findElement(By.cssSelector("input:nth-child(9)")).sendKeys("jfojfiohihgi");
    driver.findElement(By.cssSelector("input:nth-child(12)")).click();
    driver.findElement(By.cssSelector("input:nth-child(12)")).sendKeys("nrfirjgijrgioj");
    driver.findElement(By.cssSelector("input:nth-child(15)")).click();
    driver.findElement(By.cssSelector("input:nth-child(15)")).sendKeys("jfjfojjijjiji");
    driver.findElement(By.cssSelector(".flex:nth-child(18) > input")).click();
    driver.findElement(By.cssSelector(".flex:nth-child(18) > input")).sendKeys("https://imageio.forbes.com/specials-images/imageserve/5cdb058a5218470008b0b00f/Nobu-Ryokan-Malibu/0x0.jpg?format=jpg&height=1009&width=2000");
    driver.findElement(By.cssSelector(".bg-blue-600")).click();
    driver.findElement(By.cssSelector("textarea:nth-child(22)")).click();
    driver.findElement(By.cssSelector("textarea:nth-child(22)")).sendKeys("kjeopfop4uiouioioi");
    driver.findElement(By.cssSelector(".border:nth-child(2) > span")).click();
    driver.findElement(By.cssSelector(".border:nth-child(2) > span")).click();
    driver.findElement(By.cssSelector(".border:nth-child(2) > span")).click();
    driver.findElement(By.cssSelector(".border:nth-child(4) > span")).click();
    driver.findElement(By.cssSelector("textarea:nth-child(28)")).click();
    driver.findElement(By.cssSelector("textarea:nth-child(28)")).sendKeys("kjiofiohiohiohi");
    driver.findElement(By.cssSelector("div:nth-child(1) > input")).click();
    driver.findElement(By.cssSelector("div:nth-child(1) > input")).sendKeys("20:43");
    driver.findElement(By.cssSelector("div:nth-child(2) > input:nth-child(2)")).click();
    driver.findElement(By.cssSelector("div:nth-child(2) > input:nth-child(2)")).sendKeys("18:43");
    driver.findElement(By.cssSelector("div:nth-child(3) > input")).click();
    driver.findElement(By.cssSelector("div:nth-child(3) > input")).sendKeys(Keys.UP);
    driver.findElement(By.cssSelector("div:nth-child(3) > input")).sendKeys("2");
    driver.findElement(By.cssSelector(".primary")).click();
    js.executeScript("window.scrollTo(0,0)");
  }
}

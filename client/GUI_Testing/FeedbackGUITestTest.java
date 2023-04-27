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
public class FeedbackGUITestTest {
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
  public void feedbackGUITest() {
    driver.get("http://127.0.0.1:5173/");
    driver.manage().window().setSize(new Dimension(1536, 824));
    driver.findElement(By.cssSelector("div:nth-child(3)")).click();
    driver.findElement(By.linkText("My bookings")).click();
    driver.findElement(By.cssSelector(".flex:nth-child(3) > .py-3 > .flex:nth-child(1)")).click();
    driver.findElement(By.cssSelector("div:nth-child(3) > .aspect-square")).click();
    driver.findElement(By.cssSelector("form > .rounded-2xl")).click();
    driver.findElement(By.cssSelector("form > .rounded-2xl")).sendKeys("The banquet service is fast and nice");
    driver.findElement(By.cssSelector(".primary")).click();
    js.executeScript("window.scrollTo(0,0)");
    driver.findElement(By.cssSelector(".font-bold")).click();
    driver.findElement(By.cssSelector("a:nth-child(1) .bg-gray-500 > .rounded-2xl")).click();
  }
}

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
public class BookingGUITestTest {
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
  public void bookingGUITest() {
    driver.get("http://127.0.0.1:5173/");
    driver.manage().window().setSize(new Dimension(1536, 824));
    driver.findElement(By.cssSelector("a:nth-child(1) .bg-gray-500 > .rounded-2xl")).click();
    driver.findElement(By.cssSelector(".py-3:nth-child(1) > input")).click();
    driver.findElement(By.cssSelector(".py-3:nth-child(1) > input")).sendKeys("2023-04-29");
    driver.findElement(By.cssSelector(".border-l > input")).click();
    driver.findElement(By.cssSelector(".border-l > input")).sendKeys("2023-04-30");
    driver.findElement(By.cssSelector(".py-3:nth-child(3) > input:nth-child(2)")).click();
    driver.findElement(By.cssSelector(".border-t:nth-child(2) > input")).sendKeys("2");
    driver.findElement(By.cssSelector(".border-t:nth-child(2) > input")).click();
    driver.findElement(By.cssSelector("input:nth-child(4)")).click();
    driver.findElement(By.cssSelector("input:nth-child(4)")).sendKeys("9925001567");
    driver.findElement(By.cssSelector("span:nth-child(1)")).click();
    driver.switchTo().frame(2);
    driver.findElement(By.name("cardnumber")).click();
    driver.findElement(By.name("cardnumber")).sendKeys("4242 4242 4242 4242");
    driver.findElement(By.name("exp-date")).sendKeys("04 / 24");
    driver.findElement(By.name("cvc")).sendKeys("242");
    driver.findElement(By.name("postal")).sendKeys("42424");
    driver.switchTo().defaultContent();
    driver.findElement(By.cssSelector(".primary:nth-child(2)")).click();
  }
}

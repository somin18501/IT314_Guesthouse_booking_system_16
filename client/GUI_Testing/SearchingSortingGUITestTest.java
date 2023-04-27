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
public class SearchingSortingGUITestTest {
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
  public void searchingSortingGUITest() {
    driver.get("http://127.0.0.1:5173/");
    driver.manage().window().setSize(new Dimension(1536, 824));
    driver.findElement(By.cssSelector("input")).click();
    driver.findElement(By.cssSelector("input")).sendKeys("ind");
    driver.findElement(By.cssSelector(".w-4")).click();
    driver.findElement(By.cssSelector("input")).click();
    driver.findElement(By.cssSelector("input")).sendKeys("mum");
    driver.findElement(By.cssSelector(".w-4")).click();
    driver.findElement(By.cssSelector("input")).click();
    driver.findElement(By.cssSelector("input")).sendKeys("goa");
    driver.findElement(By.cssSelector(".w-4")).click();
    driver.findElement(By.cssSelector("input")).click();
    driver.findElement(By.cssSelector("input")).sendKeys("ind");
    driver.findElement(By.cssSelector(".w-4")).click();
    driver.findElement(By.cssSelector(".border:nth-child(1)")).click();
    {
      WebElement dropdown = driver.findElement(By.cssSelector(".border:nth-child(1)"));
      dropdown.findElement(By.xpath("//option[. = 'Price']")).click();
    }
    driver.findElement(By.cssSelector(".border:nth-child(1)")).click();
    {
      WebElement dropdown = driver.findElement(By.cssSelector(".border:nth-child(1)"));
      dropdown.findElement(By.xpath("//option[. = 'Title']")).click();
    }
  }
}

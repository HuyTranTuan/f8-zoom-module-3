const fakeData = `<h2>Bốn nguyên lý là gì?</h2>
        <p>OOP có 4 nguyên lý cốt lõi giống như 4 bánh xe của một chiếc ô tô - thiếu cái nào cũng khó chạy được. Đó là:</p>
        <ol>
            <li>Encapsulation (đóng gói)</li>
            <li>Inheritance (kế thừa)</li>
            <li>Polymorphism (đa hình)</li>
            <li>Abstraction (trừu tượng)</li>
        </ol>
        <p>Hãy tưởng tượng mình đang xây dựng một app quản lý nhân viên. Thay vì viết code rối như tơ vò, 4 nguyên lý này giúp mình tổ chức code thành các phần rõ ràng, dễ hiểu và dễ mở rộng.</p>

        <h2>Tại sao cần 4 nguyên lý này?</h2>
        <p>Khi không có nguyên lý rõ ràng, code sẽ trở thành một mớ hỗn độn. Mình sẽ gặp phải các vấn đề như: dữ liệu bị thay đổi lung tung từ mọi nơi, phải viết lại code giống nhau nhiều lần, khó thêm tính năng mới, và không thể tái sử dụng code đã viết.</p>
        <p>Bốn nguyên lý OOP giải quyết từng vấn đề này một cách có hệ thống, giúp code của mình trở nên chuyên nghiệp và dễ làm việc hơn.</p>

        <h2>1. Encapsulation (Đóng gói)</h2>
        <h3>Encapsulation là gì?</h3>
        <p>Encapsulation có nghĩa là gom dữ liệu và các phương thức liên quan vào một chỗ, đồng thời kiểm soát quyền truy cập vào chúng. Giống như mình có một chiếc két sắt - tiền để bên trong, chỉ ai có chìa khóa mới mở được.</p>
        <pre><code>class BankAccount {
  #balance = 0; // Private field - không truy cập trực tiếp được
  
  constructor(initialAmount) {
    if (initialAmount > 0) {
      this.#balance = initialAmount;
    }
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return true;
    }
    return false;
  }
  
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }
  
  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500); 
console.log(account.getBalance()); // 1500

// Không thể truy cập trực tiếp
console.log(account.#balance); // Error!</code></pre>
        <p>Code này bảo vệ số dư tài khoản bằng cách đặt nó là private field với <code>#balance</code>. Người dùng không thể trực tiếp thay đổi số dư mà phải thông qua các phương thức được kiểm soát như <code>deposit()</code> và <code>withdraw()</code>. Mỗi phương thức đều có logic kiểm tra để đảm bảo giao dịch hợp lệ.</p>

        <h2>2. Inheritance (Kế thừa)</h2>
        <h3>Inheritance là gì?</h3>
        <p>Inheritance cho phép một class "con" kế thừa các thuộc tính và phương thức từ class "cha". Giống như con cái thừa hưởng gen từ bố mẹ vậy.</p>
        <pre><code>class Employee {
  constructor(name, email, salary) {
    this.name = name;
    this.email = email;
    this.salary = salary;
  }
  
  work() {
  }
  
  getSalaryInfo() {
  }
}

class Developer extends Employee {
  constructor(name, email, salary, programmingLanguages) {
    super(name, email, salary); // Gọi constructor của class cha
    this.programmingLanguages = programmingLanguages;
  }
  
  code() {
    ", "
)}\`;
  }
  
  // Override phương thức của class cha
  work() {
  }
}

class Designer extends Employee {
  constructor(name, email, salary, designTools) {
    super(name, email, salary);
    this.designTools = designTools;
  }
  
  design() {
  }
}

// Sử dụng
const dev = new Developer('John', 'john@email.com', 5000, ['JavaScript', 'Python']);
console.log(dev.work()); // John is writing code
console.log(dev.code()); // John is coding in JavaScript, Python
console.log(dev.getSalaryInfo()); // John earns $5000/month

const designer = new Designer('Jane', 'jane@email.com', 4500, ['Figma', 'Photoshop']);
console.log(designer.work()); // Jane is working
console.log(designer.design()); // Jane is designing with Figma, Photoshop</code></pre>
        <p>Code trên tạo một class <code>Employee</code> làm nền tảng, sau đó <code>Developer</code> và <code>Designer</code> kế thừa từ nó. Cả hai class con đều có các thuộc tính cơ bản như name, email, salary mà không cần viết lại. Developer còn override phương thức <code>work()</code> để có hành vi riêng. Từ khóa <code>super()</code> gọi constructor của class cha để khởi tạo các thuộc tính được kế thừa.</p>

        <h2>3. Polymorphism (Đa hình)</h2>
        <h3>Polymorphism là gì?</h3>
        <p>Polymorphism cho phép các object khác nhau phản ứng khác nhau với cùng một phương thức. Giống như khi mình bảo "di chuyển", chim sẽ bay, cá sẽ bơi, người sẽ đi bộ - cùng một lệnh nhưng mỗi loài thực hiện khác nhau.</p>
        <pre><code>class NotificationSender {
  send(message) {
    throw new Error('Method send() must be implemented');
  }
}

class EmailNotification extends NotificationSender {
  send(message) {
  }
}

class SMSNotification extends NotificationSender {
  send(message) {
  }
}

class PushNotification extends NotificationSender {
  send(message) {
  }
}

// Sử dụng polymorphism
function notifyUser(notifier, message) {
  return notifier.send(message);
}

const email = new EmailNotification();
const sms = new SMSNotification();
const push = new PushNotification();

console.log(notifyUser(email, 'Your order is ready')); 
// Sending email: "Your order is ready"

console.log(notifyUser(sms, 'Your order is ready'));
// Sending SMS: "Your order is ready"

console.log(notifyUser(push, 'Your order is ready'));
// Sending push notification: "Your order is ready"</code></pre>
        <p>Hàm <code>notifyUser()</code> không cần biết mình đang làm việc với loại notification nào. Nó chỉ gọi phương thức <code>send()</code> và mỗi class tự biết cách gửi theo cách riêng. Đây chính là sức mạnh của polymorphism - code linh hoạt và dễ mở rộng.</p>

        <h2>4. Abstraction (Trừu tượng)</h2>
        <h3>Abstraction là gì?</h3>
        <p>Abstraction là việc ẩn đi những chi tiết phức tạp và chỉ cho thấy những gì cần thiết. Giống như khi mình lái xe, chỉ cần biết đạp ga để tăng tốc, không cần biết động cơ hoạt động ra sao.</p>
        <p>Khi mình nói về "trừu tượng hóa", nghĩa là mình lấy ra những đặc điểm chung nhất, bỏ qua chi tiết cụ thể. Ví dụ: xe máy, ô tô, xe đạp đều khác nhau, nhưng tất cả đều có điểm chung là "phương tiện di chuyển" - đó là trừu tượng hóa.</p>
        <pre><code>class PaymentProcessor {
  constructor() {
    if (this.constructor === PaymentProcessor) {
      throw new Error('Cannot instantiate abstract class');
    }
  }
  
  processPayment(amount) {
    // Validation chung cho mọi loại payment
    if (amount <= 0) {
      throw new Error('Invalid amount');
    }
    
    // Gọi phương thức cụ thể của từng loại payment
    return this.executePayment(amount);
  }
  
  executePayment(amount) {
    throw new Error('Method executePayment() must be implemented');
  }
}

class CreditCardPayment extends PaymentProcessor {
  constructor(cardNumber) {
    super();
    this.cardNumber = cardNumber;
  }
  
  executePayment(amount) {
    // Logic xử lý riêng cho credit card
    const maskedCard = '****' + this.cardNumber.slice(-4);
  }
}

class PayPalPayment extends PaymentProcessor {
  constructor(email) {
    super();
    this.email = email;
  }
}

// Sử dụng
const creditCard = new CreditCardPayment('1234567890123456');
console.log(creditCard.processPayment(100));
// Charged $100 to card ****3456

const paypal = new PayPalPayment('user@email.com');
console.log(paypal.processPayment(50));
// Charged $50 via PayPal account user@email.com</code></pre>
        <p>Class <code>PaymentProcessor</code> định nghĩa quy trình chung cho việc xử lý thanh toán. Nó kiểm tra tính hợp lệ của số tiền, sau đó gọi <code>executePayment()</code> - phương thức mà mỗi loại thanh toán phải tự cài đặt. Người dùng chỉ cần gọi <code>processPayment()</code> mà không cần quan tâm logic chi tiết bên trong.</p>

        <h2>Ví dụ tổng hợp: Hệ thống quản lý xe</h2>
        <pre><code>// Abstraction & Encapsulation
class Vehicle {
  #fuelLevel = 100;
  
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  
  start() {
    if (this.#fuelLevel > 0) {
    }
    return 'No fuel!';
  }
  
  refuel(amount) {
    this.#fuelLevel = Math.min(100, this.#fuelLevel + amount);
    return this.#fuelLevel;
  }
  
  getFuelLevel() {
    return this.#fuelLevel;
  }
}

// Inheritance
class Car extends Vehicle {
  constructor(brand, model, doors) {
    super(brand, model);
    this.doors = doors;
  }
  
  // Polymorphism - override method
  start() {
    return super.start() + ' - Engine running';
  }
  
  honk() {
    return 'Beep beep!';
  }
}

class Motorcycle extends Vehicle {
  constructor(brand, model, type) {
    super(brand, model);
    this.type = type; // sport, cruiser, etc.
  }
  
  // Polymorphism - different implementation
  start() {
    return super.start() + ' - Ready to ride';
  }
  
  wheelie() {
  }
}

// Sử dụng
const car = new Car('Toyota', 'Camry', 4);
const bike = new Motorcycle('Honda', 'CBR', 'sport');

console.log(car.start()); // Toyota Camry is starting - Engine running
console.log(car.honk()); // Beep beep!

console.log(bike.start()); // Honda CBR is starting - Ready to ride
console.log(bike.wheelie()); // Honda CBR doing a wheelie!

// Encapsulation in action
console.log(car.getFuelLevel()); // 100
car.refuel(20); // Fuel already full
console.log(car.#fuelLevel); // Error - private field!</code></pre>
        <p>Ví dụ này kết hợp cả 4 nguyên lý. Vehicle class trừu tượng hóa khái niệm xe bằng cách chỉ giữ lại những thuộc tính chung nhất mà mọi loại xe đều có: brand, model, fuel level, và khả năng start, refuel. Nó không quan tâm xe có mấy bánh, có cửa hay không, dùng xăng hay điện - những chi tiết đó để các class cụ thể lo. Đây chính là ý nghĩa của trừu tượng hóa: rút ra bản chất, bỏ qua chi tiết.</p>

        <h2>Lỗi thường gặp và cách tránh</h2>
        <h3>1. Quên gọi super() trong constructor</h3>
        <pre><code>// Sai
class Student extends Person {
  constructor(name, grade) {
    this.grade = grade; // Error! Must call super() first
  }
}

// Đúng
class Student extends Person {
  constructor(name, grade) {
    super(name); // Phải gọi super() trước
    this.grade = grade;
  }
}</code></pre>
        <p>Khi class con có constructor riêng, bắt buộc phải gọi <code>super()</code> trước khi truy cập <code>this</code>. Đây là quy tắc của JavaScript để đảm bảo class cha được khởi tạo đúng cách.</p>

        <h3>2. Truy cập private field từ class con</h3>
        <pre><code>class Parent {
  #privateField = 'secret';
}

class Child extends Parent {
  showSecret() {
    return this.#privateField; // Error! Private field not accessible
  }
}</code></pre>
        <p>Private fields chỉ có thể truy cập từ chính class định nghĩa nó, không thể từ class con. Nếu cần chia sẻ dữ liệu với class con, có hai cách:</p>

        <p><strong>Cách 1: Protected pattern với underscore</strong></p>
        <pre><code>class Parent {
  _protectedField = 'can be accessed by children'; // Convention: _ nghĩa là protected
  
  getProtectedField() {
    return this._protectedField;
  }
}

class Child extends Parent {
  showProtected() {
    // Có thể truy cập trực tiếp
    return this._protectedField;
    // Hoặc qua getter
    return this.getProtectedField();
  }
}</code></pre>

        <p><strong>Cách 2: Getter methods</strong></p>
        <pre><code>class Parent {
  #privateField = 'secret';
  
  // Tạo getter để class con có thể đọc
  getPrivateField() {
    return this.#privateField;
  }
  
  // Hoặc dùng getter property
  get secretData() {
    return this.#privateField;
  }
}

class Child extends Parent {
  showSecret() {
    // Truy cập qua getter method
    return this.getPrivateField();
    // Hoặc qua getter property
    return this.secretData;
  }
}

const child = new Child();
console.log(child.showSecret()); // 'secret'</code></pre>
        <p>Dấu underscore <code>_</code> là quy ước ngầm trong JavaScript nghĩa là "protected" - class con có thể truy cập nhưng code bên ngoài không nên động vào. Getter methods cho phép kiểm soát việc đọc dữ liệu mà vẫn giữ được tính private.</p>

        <h2>Lưu ý quan trọng khi sử dụng</h2>
        <p>Bốn nguyên lý OOP rất mạnh nhưng đừng lạm dụng. Không phải lúc nào cũng cần inheritance phức tạp hay abstraction nhiều tầng. Đôi khi một function đơn giản còn tốt hơn một hệ thống class phức tạp nhiều tầng lớp (ví dụ: Animal → Mammal → Dog → Poodle - quá nhiều tầng kế thừa như vậy khiến code khó hiểu và khó maintain).</p>
        <p>JavaScript không phải là ngôn ngữ OOP thuần túy nên một số khái niệm như interface hay abstract class không được hỗ trợ đầy đủ. Mình cần linh hoạt kết hợp OOP với functional programming để code hiệu quả nhất.</p>
        <p>Quan trọng nhất: code phải dễ đọc, dễ hiểu. Nếu đồng nghiệp nhìn vào code của mình mà phải gãi đầu suy nghĩ thì có thể mình đang over-engineering rồi đấy.</p>

        <div class="lesson-recap">
            <h2>Tóm tắt</h2>
            <ul>
                <li><strong>4 Nguyên lý OOP</strong>: Giống như 4 bánh xe của ô tô - thiếu cái nào cũng khó hoạt động
                    <ul>
                        <li><strong>Encapsulation</strong>: Đóng gói</li>
                        <li><strong>Inheritance</strong>: Kế thừa</li>
                        <li><strong>Polymorphism</strong>: Đa hình</li>
                        <li><strong>Abstraction</strong>: Trừu tượng</li>
                    </ul>
                </li>
                <li><strong>Encapsulation (Đóng gói)</strong>: Gom dữ liệu và phương thức vào một chỗ, kiểm soát quyền truy cập như một chiếc két sắt
                    <ul>
                        <li><strong>Private fields</strong>: Dùng <code>#</code> để tạo thuộc tính riêng tư, không thể truy cập trực tiếp từ bên ngoài</li>
                        <li><strong>Mục đích</strong>: Bảo vệ dữ liệu quan trọng, kiểm soát cách thức thay đổi dữ liệu</li>
                    </ul>
                </li>
                <li><strong>Inheritance (Kế thừa)</strong>: Class con thừa hưởng thuộc tính và phương thức từ class cha, như con cái thừa hưởng gen từ bố mẹ
                    <ul>
                        <li><strong>Extends</strong>: Dùng từ khóa <code>extends</code> để kế thừa</li>
                        <li><strong>Super()</strong>: Gọi constructor của class cha</li>
                        <li><strong>Override</strong>: Ghi đè phương thức của class cha với logic riêng</li>
                    </ul>
                </li>
                <li><strong>Polymorphism (Đa hình)</strong>: Các object khác nhau phản ứng khác nhau với cùng một phương thức
                    <ul>
                        <li><strong>Ví dụ</strong>: Lệnh "di chuyển" - chim bay, cá bơi, người đi bộ</li>
                        <li><strong>Lợi ích</strong>: Code linh hoạt, dễ mở rộng mà không cần biết chi tiết cụ thể</li>
                    </ul>
                </li>
                <li><strong>Abstraction (Trừu tượng)</strong>: Ẩn chi tiết phức tạp, chỉ hiển thị những gì cần thiết
                    <ul>
                        <li><strong>Ý nghĩa</strong>: Rút ra đặc điểm chung, bỏ qua chi tiết cụ thể</li>
                        <li><strong>Ví dụ</strong>: Lái xe chỉ cần biết đạp ga, không cần biết động cơ hoạt động thế nào</li>
                    </ul>
                </li>
                <li><strong>Lỗi thường gặp</strong>:
                    <ul>
                        <li><strong>Quên gọi super()</strong>: Phải gọi <code>super()</code> trước khi dùng <code>this</code> trong constructor của class con</li>
                        <li><strong>Truy cập private field từ class con</strong>: Private fields chỉ truy cập được từ class định nghĩa nó, dùng getter methods hoặc convention <code>_protected</code> để chia sẻ với class con</li>
                    </ul>
                </li>
                <li><strong>Lưu ý quan trọng</strong>:
                    <ul>
                        <li><strong>Không lạm dụng</strong>: Đôi khi function đơn giản tốt hơn hệ thống class phức tạp</li>
                        <li><strong>JavaScript không phải OOP thuần túy</strong>: Kết hợp linh hoạt với functional programming</li>
                        <li><strong>Ưu tiên code dễ đọc</strong>: Tránh over-engineering, code phải dễ hiểu cho đồng nghiệp</li>
                    </ul>
                </li>
            </ul>`;

export default fakeData;

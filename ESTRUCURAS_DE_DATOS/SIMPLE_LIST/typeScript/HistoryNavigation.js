var Url = /** @class */ (function () {
    function Url(url) {
        this.url = url;
        this.next = null;
    }
    return Url;
}());
var HistoryNavigation = /** @class */ (function () {
    function HistoryNavigation() {
        this.head = null;
        this.tail = null;
        this.current = null;
    }
    HistoryNavigation.prototype.addUrl = function (url) {
        var newNode = new Url(url);
        // Si la lista está vacía
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
            this.current = newNode;
        }
        else {
            // Si ya hay elementos, agregamos al final
            if (this.tail !== null) {
                this.tail.next = newNode;
                this.tail = newNode;
            }
            this.current = newNode;
        }
    };
    HistoryNavigation.prototype.showHistory = function () {
        if (this.head === null) {
            console.log("📭 El historial está vacío.");
            return;
        }
        console.log("📜 Historial de navegación:");
        console.log("=============================");
        var currentNode = this.head;
        while (currentNode !== null) {
            console.log("🌐 URL:", currentNode.url);
            console.log("➡️  Siguiente:", currentNode.next ? currentNode.next.url : "Ninguno");
            console.log("-----------------------------");
            currentNode = currentNode.next;
        }
    };
    HistoryNavigation.prototype.goBack = function () {
        var _a;
        if (this.head === null || this.current === this.head) {
            console.log("⛔ No hay páginas anteriores.");
            return;
        }
        var temp = this.head;
        while (temp !== null && temp.next !== this.current) {
            temp = temp.next;
        }
        this.current = temp;
        console.log("\u2B05\uFE0F Volviste a: ".concat((_a = this.current) === null || _a === void 0 ? void 0 : _a.url));
    };
    HistoryNavigation.prototype.goForward = function () {
        if (this.current && this.current.next) {
            this.current = this.current.next;
            console.log("\u27A1\uFE0F Avanzaste a: ".concat(this.current.url));
        }
        else {
            console.log("⛔ No hay páginas siguientes.");
        }
    };
    return HistoryNavigation;
}());
// 🧠 Prueba
var myHistory = new HistoryNavigation();
myHistory.addUrl("https://www.google.com");
myHistory.addUrl("https://www.github.com");
myHistory.addUrl("https://www.openai.com");
myHistory.showHistory();
console.log("\n🔙 Navegando hacia atrás:");
myHistory.goBack();
console.log("\n🔜 Navegando hacia adelante:");
myHistory.goForward();

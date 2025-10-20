package SINGLETON;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Scanner;

/**
 * Sistema de gestión de configuración que utiliza el patrón Singleton
 * para garantizar acceso consistente a la configuración en toda la aplicación
 */
class ApplicationConfigManager {
    
    // Instancia única del Singleton (implementación thread-safe con inicialización eager)
    private static final ApplicationConfigManager INSTANCE = new ApplicationConfigManager();
    
    private Properties configProperties;
    private Map<String, Long> lastModifiedTimestamps;
    private boolean configLoaded;
    private String configFilePath;
    
    // Constructor privado para prevenir instanciación externa
    private ApplicationConfigManager() {
        this.configProperties = new Properties();
        this.lastModifiedTimestamps = new HashMap<>();
        this.configLoaded = false;
        this.configFilePath = "application.properties"; // Ruta por defecto
        
        // Cargar configuración inicial
        loadConfiguration();
    }
    
    /**
     * Método estático para obtener la instancia única
     */
    public static ApplicationConfigManager getInstance() {
        return INSTANCE;
    }
    
    /**
     * Cargar configuración desde archivo
     */
    private synchronized void loadConfiguration() {
        try (FileInputStream fis = new FileInputStream(configFilePath)) {
            configProperties.load(fis);
            configLoaded = true;
            lastModifiedTimestamps.put(configFilePath, System.currentTimeMillis());
            System.out.println("Configuración cargada exitosamente desde: " + configFilePath);
        } catch (IOException e) {
            System.err.println("Error al cargar configuración: " + e.getMessage());
            // Usar valores por defecto
            setDefaultConfiguration();
        }
    }
    
    /**
     * Configuración por defecto en caso de error
     */
    private void setDefaultConfiguration() {
        configProperties.setProperty("database.url", "jdbc:mysql://localhost:3306/mydb");
        configProperties.setProperty("database.user", "admin");
        configProperties.setProperty("database.password", "password");
        configProperties.setProperty("app.timeout", "30000");
        configProperties.setProperty("app.max_connections", "10");
        configProperties.setProperty("app.debug_mode", "false");
        configProperties.setProperty("app.cache_size", "100MB");
        configLoaded = true;
        System.out.println("Usando configuración por defecto");
    }
    
    /**
     * Verificar si la configuración ha sido modificada externamente
     */
    public synchronized boolean isConfigModified() {
        try {
            Long lastModified = lastModifiedTimestamps.get(configFilePath);
            java.io.File configFile = new java.io.File(configFilePath);
            return configFile.exists() && configFile.lastModified() > lastModified;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Recargar configuración si ha sido modificada
     */
    public synchronized void reloadIfModified() {
        if (isConfigModified()) {
            System.out.println("Configuración modificada, recargando...");
            loadConfiguration();
        }
    }
    
    /**
     * Obtener valor de configuración como String
     */
    public String getString(String key) {
        reloadIfModified();
        return configProperties.getProperty(key);
    }
    
    /**
     * Obtener valor de configuración como entero
     */
    public int getInt(String key) {
        try {
            return Integer.parseInt(getString(key));
        } catch (NumberFormatException e) {
            throw new ConfigurationException("Valor no numérico para la clave: " + key, e);
        }
    }
    
    /**
     * Obtener valor de configuración como booleano
     */
    public boolean getBoolean(String key) {
        return Boolean.parseBoolean(getString(key));
    }
    
    /**
     * Cambiar la ruta del archivo de configuración
     */
    public synchronized void setConfigFilePath(String filePath) {
        this.configFilePath = filePath;
        loadConfiguration();
    }
    
    /**
     * Establecer un valor de configuración temporalmente (en memoria)
     */
    public synchronized void setTemporaryConfig(String key, String value) {
        configProperties.setProperty(key, value);
        System.out.println("✅ Configuración actualizada: " + key + " = " + value);
    }
    
    /**
     * Verificar si una clave existe en la configuración
     */
    public boolean containsKey(String key) {
        return configProperties.containsKey(key);
    }
    
    /**
     * Verificar si la configuración está cargada correctamente
     */
    public boolean isConfigLoaded() {
        return configLoaded;
    }
    
    /**
     * Obtener todas las configuraciones (útil para debugging)
     */
    public synchronized Properties getAllConfigurations() {
        return new Properties(configProperties); // Retorna una copia
    }
    
    /**
     * Excepción personalizada para errores de configuración
     */
    static class ConfigurationException extends RuntimeException {
        public ConfigurationException(String message) {
            super(message);
        }
        
        public ConfigurationException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}

/**
 * Interfaz de usuario para interactuar con el sistema de configuración
 */
class ConfigManagerUI {
    private Scanner scanner;
    private ApplicationConfigManager configManager;
    
    public ConfigManagerUI() {
        this.scanner = new Scanner(System.in);
        this.configManager = ApplicationConfigManager.getInstance();
    }
    
    /**
     * Mostrar el menú principal
     */
    public void showMenu() {
        int option;
        do {
            System.out.println("\n=== MENÚ CONFIGURACIÓN ===");
            System.out.println("1. Ver todas las configuraciones");
            System.out.println("2. Buscar configuración por clave");
            System.out.println("3. Modificar configuración");
            System.out.println("4. Probar servicios con configuración actual");
            System.out.println("5. Verificar estado del sistema");
            System.out.println("6. Salir");
            System.out.print("Seleccione una opción: ");
            
            option = getIntInput();
            
            switch (option) {
                case 1:
                    showAllConfigurations();
                    break;
                case 2:
                    searchConfiguration();
                    break;
                case 3:
                    modifyConfiguration();
                    break;
                case 4:
                    testServices();
                    break;
                case 5:
                    showSystemStatus();
                    break;
                case 6:
                    System.out.println("Saliendo del sistema...");
                    break;
                default:
                    System.out.println("❌ Opción no válida. Intente nuevamente.");
            }
        } while (option != 6);
    }
    
    /**
     * Mostrar todas las configuraciones
     */
    private void showAllConfigurations() {
        System.out.println("\n--- CONFIGURACIONES ACTUALES ---");
        configManager.getAllConfigurations().forEach((key, value) -> 
            System.out.println("🔑 " + key + " = " + value)
        );
    }
    
    /**
     * Buscar una configuración específica
     */
    private void searchConfiguration() {
        System.out.print("\nIngrese la clave a buscar: ");
        String key = scanner.nextLine();
        
        if (configManager.containsKey(key)) {
            String value = configManager.getString(key);
            System.out.println("✅ Valor encontrado: " + key + " = " + value);
        } else {
            System.out.println("❌ Clave no encontrada: " + key);
        }
    }
    
    /**
     * Modificar una configuración
     */
    private void modifyConfiguration() {
        System.out.println("\n--- MODIFICAR CONFIGURACIÓN ---");
        System.out.print("Ingrese la clave a modificar: ");
        String key = scanner.nextLine();
        
        if (configManager.containsKey(key)) {
            String currentValue = configManager.getString(key);
            System.out.println("Valor actual: " + currentValue);
            System.out.print("Ingrese el nuevo valor: ");
            String newValue = scanner.nextLine();
            
            configManager.setTemporaryConfig(key, newValue);
        } else {
            System.out.println("❌ Clave no existe. ¿Desea crearla? (s/n): ");
            String response = scanner.nextLine();
            if (response.equalsIgnoreCase("s")) {
                System.out.print("Ingrese el valor para la nueva clave: ");
                String newValue = scanner.nextLine();
                configManager.setTemporaryConfig(key, newValue);
            }
        }
    }
    
    /**
     * Probar los servicios con la configuración actual
     */
    private void testServices() {
        System.out.println("\n--- PROBANDO SERVICIOS ---");
        
        DatabaseService dbService = new DatabaseService();
        APIService apiService = new APIService();
        CacheService cacheService = new CacheService();
        
        dbService.connect();
        apiService.initialize();
        cacheService.setup();
    }
    
    /**
     * Mostrar estado del sistema
     */
    private void showSystemStatus() {
        System.out.println("\n--- ESTADO DEL SISTEMA ---");
        System.out.println("Configuración cargada: " + (configManager.isConfigLoaded() ? "✅" : "❌"));
        System.out.println("Archivo de configuración: " + configManager.getAllConfigurations().getProperty("database.url", "No definido"));
        System.out.println("Número de configuraciones: " + configManager.getAllConfigurations().size());
        System.out.println("Configuración modificada externamente: " + (configManager.isConfigModified() ? "✅" : "❌"));
    }
    
    /**
     * Obtener entrada numérica del usuario
     */
    private int getIntInput() {
        while (true) {
            try {
                return Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.print("❌ Entrada no válida. Ingrese un número: ");
            }
        }
    }
}

/**
 * Servicios de demostración
 */
class DatabaseService {
    public void connect() {
        ApplicationConfigManager config = ApplicationConfigManager.getInstance();
        String url = config.getString("database.url");
        String user = config.getString("database.user");
        
        System.out.println("🗄️ DatabaseService conectando a: " + url);
        System.out.println("   Usuario: " + user);
        System.out.println("   Timeout: " + config.getInt("app.timeout") + "ms");
    }
}

class APIService {
    public void initialize() {
        ApplicationConfigManager config = ApplicationConfigManager.getInstance();
        int maxConnections = config.getInt("app.max_connections");
        boolean debugMode = config.getBoolean("app.debug_mode");
        
        System.out.println("🌐 APIService inicializado");
        System.out.println("   Conexiones máximas: " + maxConnections);
        System.out.println("   Modo debug: " + (debugMode ? "✅ ACTIVADO" : "❌ DESACTIVADO"));
    }
}

class CacheService {
    public void setup() {
        ApplicationConfigManager config = ApplicationConfigManager.getInstance();
        String cacheSize = config.getString("app.cache_size");
        
        System.out.println("💾 CacheService configurado");
        System.out.println("   Tamaño de cache: " + cacheSize);
    }
}

/**
 * Clase principal de demostración
 */
class SingletonPatternDemo {
    public static void main(String[] args) {
        System.out.println("=== SISTEMA DE GESTIÓN DE CONFIGURACIÓN ===");
        System.out.println("🔧 Patrón Singleton implementado");
        System.out.println("📝 Use el menú para interactuar con el sistema\n");
        
        // Iniciar la interfaz de usuario
        ConfigManagerUI ui = new ConfigManagerUI();
        ui.showMenu();
        
        System.out.println("\n=== PROGRAMA FINALIZADO ===");
    }
}

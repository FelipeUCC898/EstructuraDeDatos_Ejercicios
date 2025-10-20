package singleton;

public class Progrmaa {
	
	public static void main(String [] args) {
		Logger logger = Logger.getInstance();
		logger.addLogMessage("Mensaje 1");
		logger.addLogMessage("Mensaje 2");
		
		Logger sameLogger = Logger.getInstance();
		sameLogger.addLogMessage("Mensaje 3");;
	
		logger.printLogs();
	}
}

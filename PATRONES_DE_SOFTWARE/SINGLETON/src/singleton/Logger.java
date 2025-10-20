package singleton;

import java.util.ArrayList;
import java.util.List;

public class Logger {
	private static Logger instance;
	private List<String> logMessages = new ArrayList<>();
	public Logger() {
		super();
	}
	public static Logger getInstance() {
		if (instance == null) {
			instance = new Logger();
		}
		return instance;
	}
	
	public void addLogMessage(String message) {
		logMessages.add(message);
		
	}
	
	public void printLogs() {
		for (String message : logMessages) {
			System.out.println(message);
		}
	}
	
	
	
	

}
